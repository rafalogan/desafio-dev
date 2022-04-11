import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcessComponent } from "./pages/process/process.component";

const routes: Routes = [
  { path: '', component: ProcessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
