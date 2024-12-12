import { Routes } from '@angular/router';
import {GlobalComponent} from './global/global.component';
import {ContinentComponent} from './continent/continent.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'global'
  },
  {
    path: 'global',
    component: GlobalComponent
  },
  {
    path: 'continent/:continentId',
    component: ContinentComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'global'
  }
];
