import { Injectable } from '@angular/core';
import { MessageService as MS } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService {
  constructor(private messageService: MS) {}

  error(text: string) {
    console.log(text);
    this.messageService.add({
      severity: 'error',
      summary: 'Greska',
      detail: text,
    });
  }
  warn(text: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Pozor',
      detail: text,
    });
  }
  info(text: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: text,
    });
  }
  success(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Uspeh',
      detail: text,
    });
  }
}
