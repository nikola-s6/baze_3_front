import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  GetAllJavniPozivDTO,
  JavniPoziv,
  JavniPozivFilters,
} from 'src/app/shared/models/javni-poziv.model';
import { JavniPozivService } from '../javni-poziv.service';
import {
  FormBuilder,
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { CustomMessageService } from 'src/app/shared/services/message.service';
import { debounceTime, Subscription } from 'rxjs';
import { PrivredniSubjekt } from 'src/app/shared/models/privredni-subjekt';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { CreateJpComponent } from 'src/app/shared/components/createJPDialog/createJp.component';

@Component({
  selector: 'app-janvni-poziv-list',
  templateUrl: './javni-poziv-list.component.html',
  styleUrls: ['./javni-poziv-list.component.scss'],
})
export class JavniPozivListComponent implements OnInit {
  javniPozivList: GetAllJavniPozivDTO[];
  filterForm: UntypedFormGroup;
  privredniSubjekti: { title: string; value: number }[];

  constructor(
    private javniPozivService: JavniPozivService,
    private fb: FormBuilder,
    private messageService: CustomMessageService,
    private sharedServcie: SharedService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getJavniPozivList();

    this.sharedServcie.getAllPrivredniSubjekti().subscribe({
      next: (val) => {
        this.privredniSubjekti = val.data.map((ps) => {
          return { title: ps.nazivPrivrednogSubjekta, value: ps.maticniBroj };
        });
        console.log(this.privredniSubjekti);
      },
      error: (err) => {
        this.messageService.error(err?.error?.message ?? err);
      },
    });
  }

  initForm() {
    this.filterForm = this.fb.group({
      referentniBroj: new UntypedFormControl(null),
      nazivPoziva: new UntypedFormControl(null),
      datumIzdavanjaOd: new UntypedFormControl(null),
      datumIzdavanjaDo: new UntypedFormControl(null),
      datumZatvaranjaOd: new UntypedFormControl(null),
      datumZatvaranjaDo: new UntypedFormControl(null),
      procenjenaVrednostOd: new UntypedFormControl(null),
      procenjenaVrednostDo: new UntypedFormControl(null),
      privredniSubjekt: new UntypedFormControl(null),
    });

    this.filterForm.valueChanges.pipe(debounceTime(250)).subscribe({
      next: (val) => {
        console.log(val);
        this.getJavniPozivList(val);
      },
      error: (err) => {
        this.messageService.error(err?.error?.message ?? err);
      },
    });
  }

  getJavniPozivList(filters?: JavniPozivFilters) {
    this.javniPozivService
      .getJavniPozivList(filters ?? this.filterForm.value)
      .subscribe({
        next: (val) => {
          this.javniPozivList = val.data;
          console.log(this.javniPozivList);
        },
        error: (err) => {
          this.messageService.error(err?.error?.message ?? err);
        },
      });
  }

  resetFilters() {
    this.filterForm.reset();
  }

  trackByFn(index: number, jp: GetAllJavniPozivDTO): number {
    return jp.referentniBroj;
  }

  createJP() {
    this.dialogService.openDialog(CreateJpComponent).subscribe({
      next: (val) => {
        if (val.closed) return;
        this.javniPozivList.push(val.data);
      },
      error: (err) => {
        this.messageService.error(err.error?.message ?? err);
      },
    });
  }

  redirectToJavniPoziv(jp: GetAllJavniPozivDTO) {
    window.open(`/v1/javni-poziv/${jp.referentniBroj}`, '_self');
  }
}
