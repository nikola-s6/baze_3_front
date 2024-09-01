import { Component, Input, Optional, Self } from '@angular/core';
import { CustomControlBaseComponent } from '../custom-control-base.component';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  //   styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent extends CustomControlBaseComponent<Date> {
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
