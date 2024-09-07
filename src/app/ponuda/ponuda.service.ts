import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ponuda, PonudaFull } from '../shared/models/ponuda.model';
import { ApiResponse } from '../shared/models/zaposleni.model';

@Injectable({
  providedIn: 'root',
})
export class PonudaService {
  private apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  createPonuda(data: any) {
    return this.http.post<ApiResponse<Ponuda[]>>(`${this.apiURL}/ponuda`, data);
  }

  getPonudaDetails(referentniBroj: number) {
    return this.http.get<ApiResponse<PonudaFull>>(
      `${this.apiURL}/ponuda/${referentniBroj}`
    );
  }

  deletePonuda(referentniBrojPonude: number) {
    return this.http.delete(`${this.apiURL}/ponuda/${referentniBrojPonude}`);
  }
}
