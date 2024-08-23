import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CustomControlBaseComponent } from '../custom-control-base.component';
import {
  AbstractControl,
  FormControl,
  NgControl,
  UntypedFormControl,
} from '@angular/forms';
import { CustomErrorStateMatcher } from '../error-matche.component';
import { CustomMessageService } from '../../services/message.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends CustomControlBaseComponent<
  string | number
> {
  @Input() placeholder: string;
  @Input() title: string;
  @Input() type: 'text' | 'number' | 'email' = 'text';
  matcher: CustomErrorStateMatcher;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.matcher = new CustomErrorStateMatcher();
  }

  onValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(this.ngControl.invalid);
    this.onChage(input.value);
  }

  get control() {
    return this.ngControl.control as FormControl;
  }
}
