import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  GetAllJavniPozivDTO,
  JavniPoziv,
  JavniPozivDetails,
  JavniPozivFilters,
} from '../shared/models/javni-poziv.model';
import { ApiResponse } from '../shared/models/zaposleni.model';

@Injectable({
  providedIn: 'root',
})
export class JavniPozivService {
  private apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  getJavniPozivList(filter?: JavniPozivFilters) {
    let params = new HttpParams();

    if (filter) {
      Object.keys(filter).map((f) => {
        const filterKey = f as keyof JavniPozivFilters;
        const value = filter[filterKey];
        if (!value) return;
        params = params.append(filterKey, value);
      });
    }
    console.log(params);

    return this.http.get<ApiResponse<Array<GetAllJavniPozivDTO>>>(
      `${this.apiURL}/javni-poziv`,
      { params }
    );
  }

  getJavniPozivDetails(referentniBroj: number) {
    return this.http.get<ApiResponse<JavniPozivDetails>>(
      `${this.apiURL}/javni-poziv/${referentniBroj}`
    );
  }

  createJavniPoziv(data: any) {
    return this.http.post<ApiResponse<GetAllJavniPozivDTO>>(
      `${this.apiURL}/javni-poziv`,
      data
    );
  }
}
