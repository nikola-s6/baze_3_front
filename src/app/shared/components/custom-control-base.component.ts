import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-base-control',
  template: '',
})
export class CustomControlBaseComponent<T> implements ControlValueAccessor {
  @Input() value: T | null;

  touched: boolean;
  isDisabled: boolean;

  markAsTouched() {
    if (this.touched) return;
    this.onTouched(this.value);
    this.touched = true;
  }

  writeValue(value: T | null): void {
    if (!value) {
      value = null;
      this.touched = false;
    }
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChage = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected onChage = (value: T | null) => {};
  protected onTouched = (value: T | null) => {};
}
