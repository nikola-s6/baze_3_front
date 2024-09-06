import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PonudaService } from './ponuda.service';
import { PonudaDetailsComponent } from './ponuda-details/ponuda-details.component';
import { PonudaRoutingModule } from './ponuda-routing.module';

@NgModule({
  declarations: [PonudaDetailsComponent],
  imports: [SharedModule, PonudaRoutingModule],
  providers: [PonudaService],
})
export class PonudaModule {}
