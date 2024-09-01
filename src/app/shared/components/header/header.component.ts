import { Component, OnInit } from '@angular/core';
import { Zaposleni } from '../../models/zaposleni.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  zaposleni: Zaposleni;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.zaposleni = this.userService.getUser()!;
  }

  logout() {
    this.userService.clear();
    window.open('auth/login', '_self');
  }

  redirect(path: string) {
    window.open(`v1/${path}`, '_self');
  }
}
