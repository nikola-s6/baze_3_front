import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title: string;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() fontSize: number = 16;
  @Input() disabled: boolean;
}
