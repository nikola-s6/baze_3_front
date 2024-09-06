import { Component, OnInit } from '@angular/core';
import { CustomMessageService } from 'src/app/shared/services/message.service';
import { PonudaService } from '../ponuda.service';
import { ActivatedRoute } from '@angular/router';
import { PonudaFull } from 'src/app/shared/models/ponuda.model';

@Component({
  selector: 'app-ponuda-details',
  templateUrl: './ponuda-details.component.html',
  styleUrls: ['./ponuda-details.component.scss'],
})
export class PonudaDetailsComponent implements OnInit {
  ponuda: PonudaFull;

  constructor(
    private route: ActivatedRoute,
    private messageService: CustomMessageService,
    private ponudaService: PonudaService
  ) {}

  ngOnInit(): void {
    const params: any = this.route.snapshot.params;
    this.ponudaService
      .getPonudaDetails(Number(params.referentniBrojPonude))
      .subscribe({
        next: (val) => {
          this.ponuda = val.data;
        },
        error: (err) => {
          this.messageService.error(err.error?.message ?? err.message);
        },
      });
  }
}
