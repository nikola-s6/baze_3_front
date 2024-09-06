import { Component, OnInit } from '@angular/core';
import { CustomMessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-ponuda-details',
  templateUrl: './ponuda-details.component.html',
})
export class PonudaDetailsComponent implements OnInit {
  constructor(private messageService: CustomMessageService) {}

  ngOnInit(): void {}
}
