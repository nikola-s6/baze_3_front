import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JavniPozivListComponent } from './list/javni-poziv-list.component';

const routes: Routes = [
  {
    path: '',
    component: JavniPozivListComponent,
    children: [
      {
        path: ':javniPozivId',
        component: JavniPozivListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JavniPozivRouterRoutingModule {}
