import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { JavniPozivRouterRoutingModule } from './javni-poziv-routing.module';
import { JavniPozivService } from './javni-poziv.service';
import { JavniPozivListComponent } from './list/javni-poziv-list.component';
import { JavniPozivDetailsComponent } from './details/jp-details.component';

@NgModule({
  declarations: [JavniPozivListComponent, JavniPozivDetailsComponent],
  imports: [SharedModule, JavniPozivRouterRoutingModule],
  providers: [JavniPozivService],
})
export class JavniPozivModule {}
