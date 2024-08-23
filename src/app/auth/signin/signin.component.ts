import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomMessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // private ms: MessageService
    private ms: CustomMessageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      sifra: new UntypedFormControl('', [Validators.required]),
    });
  }

  handleSignIn() {
    const { email, sifra } = this.form.value;
    this.authService.signin(email, sifra).subscribe({
      next: (val) => {
        this.ms.success('Uspesno logovanje');
        this.userService.setUser(val.data);
        console.log(this.userService.getUser(), 'user');
        // window.open('v1/home', '_self');
        this.router.navigate(['/v1/home']);
      },
      error: (err) => {
        console.log(err);
        this.ms.error(err?.error.message);
      },
    });
  }
}
