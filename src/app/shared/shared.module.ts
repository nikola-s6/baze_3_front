import { ModuleWithProviders, NgModule } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from './components/button/button.component';
import { ToastModule } from 'primeng/toast';
import { CustomMessageService } from './services/message.service';
import { MessageService } from 'primeng/api';
import { UserService } from './services/user.service';
import { HeaderComponent } from './components/header/header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { SharedService } from './services/shared.service';
import { SelectComponent } from './components/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { BoolTransfrom } from './pipes/boolean-transform.pipe';

const components = [
  CalendarComponent,
  InputComponent,
  ButtonComponent,
  HeaderComponent,
  SelectComponent,
];
const services = [
  CustomMessageService,
  MessageService,
  UserService,
  SharedService,
];
const imports = [
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
  ToastModule,
  RouterModule,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
];
const pipes = [BoolTransfrom];

@NgModule({
  declarations: [...components, ...pipes],
  exports: [...imports, ...components, ...pipes],
  imports: imports,
  providers: [...services],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      // todo add shared service
    };
  }
}
