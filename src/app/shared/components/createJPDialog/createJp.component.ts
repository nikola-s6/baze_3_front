import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';
import { CustomMessageService } from '../../services/message.service';
import { Oznaka } from '../../models/javni-poziv.model';
import { JavniPozivService } from 'src/app/javni-poziv/javni-poziv.service';

@Component({
  selector: 'app-create-jp',
  templateUrl: './createJp.component.html',
  styleUrls: ['./createJp.component.scss'],
})
export class CreateJpComponent implements OnInit {
  form: UntypedFormGroup;
  oznake: { title: string; value: number }[];
  valute: { title: string; value: number }[];
  kriterijumFormControl: FormControl;
  kriterijumi: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateJpComponent>,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private messageService: CustomMessageService,
    private javniPozivService: JavniPozivService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.sharedService.getAllOznaka().subscribe({
      next: (val) => {
        this.oznake = val.data.map((oznaka) => ({
          title: oznaka.naziv,
          value: oznaka.broj,
        }));
      },
      error: (err) => {
        this.messageService.error(err.error?.message ?? err);
      },
    });
    this.sharedService.getAllValuta().subscribe({
      next: (val) => {
        this.valute = val.data.map((valuta) => ({
          title: valuta.nazivValute,
          value: valuta.valutaId,
        }));
        console.log(this.valute);
      },
      error: (err) => {
        this.messageService.error(err.error?.message ?? err);
      },
    });
  }

  initForm() {
    // zaposleni se izvlaci iz jwt-a na backu
    this.form = this.fb.group({
      nazivPoziva: new UntypedFormControl(null),
      datumIzdavanja: new UntypedFormControl(new Date()),
      datumZatvaranja: new UntypedFormControl(null),
      procenjenaVrednost: new UntypedFormControl(null),
      oznaka: new UntypedFormControl(null),
      valuta: new UntypedFormControl(null),
      opis: new UntypedFormControl(null),
      dodatniPodaci: new UntypedFormControl(null),
      dozvoljeneVarijante: new UntypedFormControl(false),
      adresaDostavljanja: new UntypedFormControl(null),
      podlozanProduzenju: new UntypedFormControl(false),
      obrazlozenjeProduzenja: new UntypedFormControl(null),
      osnovnaDelatnost: new UntypedFormControl(null),
    });
    this.kriterijumFormControl = new UntypedFormControl('');
  }

  onSubmit() {
    this.javniPozivService
      .createJavniPoziv({ ...this.form.value, kriterijumi: this.kriterijumi })
      .subscribe({
        next: (val) => {
          this.dialogRef.close(val.data);
          this.messageService.success('Javni poziv uspesno kreiran');
        },
        error: (err) => {
          this.messageService.error(err.error?.message ?? err.message);
        },
      });
  }

  close() {
    this.dialogRef.close();
  }

  addKriterijum() {
    this.kriterijumi.push(this.kriterijumFormControl.value);
    this.kriterijumFormControl.setValue('');
  }
}
