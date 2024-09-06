import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kriterijum } from '../../models/kriterijum.model';
import { SharedService } from '../../services/shared.service';
import { PonudaService } from 'src/app/ponuda/ponuda.service';
import { Subscription } from 'rxjs';
import { CustomMessageService } from '../../services/message.service';

@Component({
  selector: 'app-create-ponuda',
  templateUrl: './create-ponuda.component.html',
  styleUrls: ['./create-ponuda.component.scss'],
})
export class CreatePonudaComponent implements OnInit, OnDestroy {
  @Input() isCreate: boolean;
  @Input() javniPoziv: {
    referentniBrojJP: number;
    naziv: string;
    kriterijumi: Kriterijum[];
  };

  valute: { title: string; value: number }[];
  jediniceMere: { title: string; value: number }[];
  form: UntypedFormGroup;
  javniPozivOption: { title: string; value: number };
  subscription: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<CreatePonudaComponent>,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private messageService: CustomMessageService,
    private ponudaService: PonudaService,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      isCreate: boolean;
      javniPoziv: {
        referentniBrojJP: number;
        naziv: string;
        kriterijumi: Kriterijum[];
      };
    }
  ) {
    this.isCreate = data.isCreate;
    this.javniPoziv = this.data.javniPoziv;
    this.javniPozivOption = {
      title: `${this.javniPoziv.naziv} (${this.javniPoziv.referentniBrojJP})`,
      value: this.javniPoziv.referentniBrojJP,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.sharedService.getAllValuta().subscribe({
      next: (val) => {
        this.valute = val.data.map((valuta) => ({
          title: valuta.nazivValute,
          value: valuta.valutaId,
        }));
      },
      error: (err) => {
        this.messageService.error(err.error?.message ?? err);
      },
    });
    this.subscription.add(
      this.sharedService.getAllJedinicaMere().subscribe({
        next: (val) => {
          this.jediniceMere = val.data.map((jedinicaMere) => {
            return {
              title: `${jedinicaMere.nazivJediniceMere} (${jedinicaMere.oznakaJediniceMere})`,
              value: jedinicaMere.jedinicaMereId,
            };
          });
        },
      })
    );
  }

  initForm() {
    this.form = this.fb.group({
      datum: new FormControl(new Date()),
      ukljucujeProizvodjace: new FormControl(false),
      samostalna: new FormControl(false),
      izjavaOIntegritetu: new FormControl(false),
      cenaBezPDV: new FormControl(null),
      cenaSaPDV: new FormControl(null),
      valutaId: new FormControl(null),
      referentniBrojJP: new FormControl(this.javniPoziv.referentniBrojJP, [
        Validators.required,
      ]),
      ponudeKriterijuma: this.fb.array(
        this.javniPoziv.kriterijumi.map((kriterijum) => {
          return this.fb.group({
            kriterijumPozivaId: new FormControl(kriterijum.id, [
              Validators.required,
            ]),
            vrednost: new FormControl(null),
            nazivKriterijumaPoziva: new FormControl(
              kriterijum.nazivKriterijumaPoziva,
              [Validators.required]
            ),
            jedinicaMereId: new FormControl(null),
          });
        })
      ),
      // zaposleni id dodat na backu kroz jwt
    });

    this.form.get('cenaBezPDV')?.valueChanges.subscribe({
      next: (val) => {
        const sapdv = this.form.get('cenaSaPDV');
        const bezpdv = this.form.get('cenaBezPDV');
        if (!val) {
          bezpdv?.setValue(null, { emitEvent: false });
          sapdv?.setValue(null, { emitEvent: false });
          return;
        }
        const numVal = Number(val);
        if (isNaN(numVal) || (!numVal && numVal !== 0)) return;
        bezpdv?.setValue(numVal, { emitEvent: false });
        sapdv?.setValue(Math.floor(numVal * 1.2), { emitEvent: false });
      },
    });
  }

  get kriterijumiControls() {
    return (this.form.get('ponudeKriterijuma') as FormArray)
      .controls as UntypedFormGroup[];
  }

  onSubmit() {
    this.ponudaService.createPonuda(this.form.value).subscribe({
      next: (val) => {
        this.dialogRef.close({ closed: false, data: val.data });
        this.messageService.success('Kreirana ponuda za javni poziv');
      },
      error: (err) => {
        this.messageService.error(err.error?.message ?? err.message);
        console.log(err.error?.message ?? err.message);
      },
    });
  }

  close() {
    this.dialogRef.close({ closed: true });
  }
}
