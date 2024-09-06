import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Zaposleni } from '../shared/models/zaposleni.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = environment.apiURL + '/auth';

  constructor(private http: HttpClient) {}

  signin(email: string, sifra: string) {
    return this.http.post<ApiResponse<Zaposleni> & { jwt: string }>(
      `${this.apiURL}/login`,
      {
        email,
        sifra,
      }
    );
  }
}
