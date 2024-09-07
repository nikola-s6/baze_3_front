import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { CustomMessageService } from '../../services/message.service';

@Component({
  selector: 'app-create-odluka',
  templateUrl: './create-odluka.component.html',
})
export class CreateOdlukaComponent implements OnInit {
  form: UntypedFormGroup;
  zaposleni: { title: string; value: number }[];

  constructor(
    private dialogRef: MatDialogRef<CreateOdlukaComponent>,
    private messageService: CustomMessageService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      javniPoziv: { value: number; title: string };
      ponuda: { value: number; title: string };
    }
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.sharedService.getZaposleniList().subscribe({
      next: (val) => {
        this.zaposleni = val.data.map((zaposleni) => ({
          title: `${zaposleni.imeIPrezime} (${zaposleni.nazivPrivrednogSubjekta})`,
          value: zaposleni.zaposleniId,
        }));
      },
    });
  }

  initForm() {
    this.form = this.fb.group({
      datumOdluke: new FormControl(new Date()),
      komisijaPrviClan: new FormControl(null),
      komisijaDrugiClan: new FormControl(null),
      komisijaTreciClan: new FormControl(null),
      referentniBrojJP: new FormControl(this.data.javniPoziv.value),
      referentniBrojPonude: new FormControl(this.data.ponuda.value),
    });
  }

  onSubmit() {
    this.sharedService.createOdluka(this.form.value).subscribe({
      next: (val) => {
        this.dialogRef.close({ closed: false, data: val.data });
        this.messageService.success('Kreirana odluka o dodeli ugovora');
      },
      error: (err) => {
        this.messageService.error(err.error?.message ?? err);
      },
    });
  }

  close() {
    this.dialogRef.close({ closed: true });
  }
}
