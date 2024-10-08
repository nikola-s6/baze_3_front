import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CustomControlBaseComponent } from '../custom-control-base.component';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { CustomErrorStateMatcher } from '../error-matche.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent
  extends CustomControlBaseComponent<string | number>
  implements OnInit
{
  @Input() placeholder: string;
  @Input() title: string;
  @Input() type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'check'
    | 'textarea' = 'text';
  matcher: CustomErrorStateMatcher;
  isRegular: boolean;
  isArea: boolean;
  isCheck: boolean;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.matcher = new CustomErrorStateMatcher();
  }

  ngOnInit(): void {
    this.checkType();
  }

  private checkType() {
    if (['text', 'number', 'email', 'password'].includes(this.type)) {
      this.isRegular = true;
      this.isCheck = false;
      this.isArea = false;
      return;
    }
    if (this.type === 'check') {
      this.isRegular = false;
      this.isArea = false;
      this.isCheck = true;
      return;
    }
    if (this.type === 'textarea') {
      this.isRegular = false;
      this.isArea = true;
      this.isCheck = false;
    }
  }

  onValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onChage(input.value);
  }

  get control() {
    return this.ngControl.control as FormControl;
  }
}
