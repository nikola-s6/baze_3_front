import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JavniPozivService } from '../javni-poziv.service';
import { JavniPozivDetails } from 'src/app/shared/models/javni-poziv.model';
import { MessageService } from 'primeng/api';
import { CustomMessageService } from 'src/app/shared/services/message.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { CreatePonudaComponent } from 'src/app/shared/components/createPonudadialog/ceate-ponuda.component';

@Component({
  selector: 'app-javni-poziv-details',
  templateUrl: './jp-details.component.html',
  styleUrls: ['./jp-details.component.scss'],
})
export class JavniPozivDetailsComponent implements OnInit {
  javniPoziv: JavniPozivDetails;

  constructor(
    private route: ActivatedRoute,
    private javniPozivService: JavniPozivService,
    private messageService: CustomMessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    const params: any = this.route.snapshot.params;
    if (params.javniPozivId) {
      this.javniPozivService
        .getJavniPozivDetails(params.javniPozivId)
        .subscribe({
          next: (val) => {
            this.javniPoziv = val.data;
          },
          error: (err) => {
            this.messageService.error(err?.error?.message ?? err);
          },
        });
    }
  }

  createPonuda() {
    this.dialogService
      .openDialog(CreatePonudaComponent, {
        javniPoziv: {
          referentniBrojJP: this.javniPoziv.referentniBroj,
          naziv: this.javniPoziv.nazivPoziva,
          kriterijumi: this.javniPoziv.kriterijumi,
        },
      })
      .subscribe({
        next: (val) => {
          if (val.closed) return;
          this.javniPoziv.ponude = val.data;
        },
      });
  }

  redirectToPonudaDetails(referentniBroj: number) {
    window.open(`v1/ponuda/${referentniBroj}`, '_self');
  }
}
