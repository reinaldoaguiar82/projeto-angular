import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'entries', loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule) },
  { path: 'categorias', loadChildren: () => import('./pages/categorias/categorias.module').then(m => m.CategoriasModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
