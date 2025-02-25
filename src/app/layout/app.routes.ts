import {Routes} from '@angular/router';
import {RegionComponent} from '../features/region/region.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'region/global'
  },
  {
    path: 'region/:continentId',
    component: RegionComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'region/global'
  }
];
