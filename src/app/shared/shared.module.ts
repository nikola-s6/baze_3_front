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
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './services/dialog.service';
import { CreateJpComponent } from './components/createJPDialog/createJp.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const components = [
  CalendarComponent,
  InputComponent,
  ButtonComponent,
  HeaderComponent,
  SelectComponent,
  CreateJpComponent,
];
const services = [
  CustomMessageService,
  MessageService,
  UserService,
  SharedService,
  DialogService,
];
const imports = [
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatDialogModule,
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
