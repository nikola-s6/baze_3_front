import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PonudaDetailsComponent } from './ponuda-details/ponuda-details.component';

const routes: Routes = [
  { path: ':referentniBrojPonude', component: PonudaDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PonudaRoutingModule {}
