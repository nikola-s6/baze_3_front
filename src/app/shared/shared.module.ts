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

const components = [InputComponent, ButtonComponent];
const services = [CustomMessageService, MessageService];
const imports = [
  MatInputModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
  ToastModule,
];

@NgModule({
  declarations: components,
  exports: [...imports, ...components],
  imports: imports,
  providers: services,
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      // todo add shared service
    };
  }
}
