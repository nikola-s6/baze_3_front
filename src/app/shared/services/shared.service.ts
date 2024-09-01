import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/zaposleni.model';
import { PrivredniSubjekt } from '../models/privredni-subjekt';

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
}
