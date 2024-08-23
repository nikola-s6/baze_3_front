import { Injectable } from '@angular/core';
import { Zaposleni } from '../models/zaposleni.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: Zaposleni | null;

  getUser(): Zaposleni | undefined {
    const user = localStorage.getItem('user');
    if (!user) return;
    return JSON.parse(user) as Zaposleni;
  }

  setUser(user: Zaposleni) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clear() {
    localStorage.removeItem('user');
  }

  isLogged() {
    return !!this.getUser();
  }
}
