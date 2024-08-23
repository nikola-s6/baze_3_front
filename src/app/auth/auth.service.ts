import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = environment.apiURL + 'auth';

  constructor(private http: HttpClient) {}

  signin(email: string, sifra: string) {
    return this.http.post(`${this.apiURL}/login`, { email, sifra });
  }
}
