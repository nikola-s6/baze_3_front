import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [MainComponent, HomeComponent],
  imports: [SharedModule, MainRoutingModule],
  providers: [],
})
export class MainModule {}
