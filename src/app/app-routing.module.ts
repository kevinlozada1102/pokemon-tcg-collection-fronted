import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SeriesComponent} from "./components/series/series.component";
import {ExpansionComponent} from "./components/expansion/expansion.component";
import {CartasComponent} from "./components/cartas/cartas.component";

const routes: Routes = [
  { path: '', component: SeriesComponent },
  { path: 'serie/:serieId', component: ExpansionComponent },
  { path: 'expansion/:expansionId', component: CartasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
