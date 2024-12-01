import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./presentation/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./presentation/pages/event/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'event-update',
    loadChildren: () => import('./presentation/pages/eventUpdate/event-update/event-update.module').then( m => m.EventUpdatePageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
