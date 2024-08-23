import { Component, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CustomControlBaseComponent } from 'src/app/shared/components/custom-control-base.component';
import { AuthService } from '../auth.service';
import { CustomMessageService } from 'src/app/shared/services/message.service';

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
    private ms: CustomMessageService
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
        console.log(val);
        this.ms.success('uspesno logovanje');
      },
      error: (err) => {
        console.log(err);
        this.ms.error(err?.error.message);
      },
    });
  }
}
