import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { JavniPozivRouterRoutingModule } from './javni-poziv-routing.module';
import { JavniPozivService } from './javni-poziv.service';
import { JavniPozivListComponent } from './list/javni-poziv-list.component';

@NgModule({
  declarations: [JavniPozivListComponent],
  imports: [SharedModule, JavniPozivRouterRoutingModule],
  providers: [JavniPozivService],
})
export class JavniPozivModule {}
