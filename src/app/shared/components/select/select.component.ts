import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CustomControlBaseComponent } from '../custom-control-base.component';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends CustomControlBaseComponent<any> {
  @Input() options: { title: string; value: any }[];
  @Input() title: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control() {
    return this.ngControl.control as FormControl;
  }
}
