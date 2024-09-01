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

  setUser(user: Zaposleni, jwt?: string) {
    localStorage.setItem('user', JSON.stringify(user));
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    }
  }

  clear() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
  }

  isLogged() {
    return !!this.getUser();
  }
}
