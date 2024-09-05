import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JavniPozivListComponent } from './list/javni-poziv-list.component';
import { JavniPozivDetailsComponent } from './details/jp-details.component';

const routes: Routes = [
  {
    path: '',
    component: JavniPozivListComponent,
  },
  { path: ':javniPozivId', component: JavniPozivDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JavniPozivRouterRoutingModule {}
