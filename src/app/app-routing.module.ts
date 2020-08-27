import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemEditComponent } from './components/item-edit/item-edit.component';
import { DtTestComponent } from './components/dt-test/dt-test.component';

const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'new', component: ItemEditComponent },
  { path: 'edit/:id', component: ItemEditComponent },
  // for testing purposes
  { path: 'dt-test', component: DtTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
