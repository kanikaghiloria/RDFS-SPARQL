import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomQueryComponent } from './common-components/custom-query/custom-query.component';
import { QueriesComponent } from './common-components/queries/queries.component';


const routes: Routes = [
  { path: '', redirectTo: 'showQuery', pathMatch: 'full' },
  { path: 'query', component:  CustomQueryComponent},
  { path: 'showQuery', component: QueriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
