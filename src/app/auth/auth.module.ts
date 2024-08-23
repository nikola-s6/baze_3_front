import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [SigninComponent],
  imports: [AuthRoutingModule, SharedModule],
  providers: [AuthService],
})
export class AuthModule {}
