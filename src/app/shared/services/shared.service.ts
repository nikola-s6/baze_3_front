import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/zaposleni.model';
import { PrivredniSubjekt } from '../models/privredni-subjekt';
import { Oznaka } from '../models/javni-poziv.model';
import { Valuta } from '../models/ponuda.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllPrivredniSubjekti() {
    return this.http.get<ApiResponse<PrivredniSubjekt[]>>(
      `${this.apiURL}/privredni-subjekt`
    );
  }

  getAllOznaka() {
    return this.http.get<ApiResponse<Oznaka[]>>(`${this.apiURL}/oznaka`);
  }

  getAllValuta() {
    return this.http.get<ApiResponse<Valuta[]>>(`${this.apiURL}/valuta`);
  }
}
