import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ponuda } from '../shared/models/ponuda.model';
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
}
