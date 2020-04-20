import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'hospital/generate-alert',
    loadChildren: () => import('./hospital/generate-alert/generate-alert.module').then( m => m.GenerateAlertPageModule)
  },
  {
    path: 'hospital/create-success-story',
    loadChildren: () => import('./hospital/create-success-story/create-success-story.module').then( m => m.CreateSuccessStoryPageModule)
  },
  {
    path: 'profile-settings',
    loadChildren: () => import('./profile-settings/profile-settings.module').then( m => m.ProfileSettingsPageModule)
  },
  {
    path: 'hospital/available-donors/:alertId',
    loadChildren: () => import('./hospital/available-donors/available-donors.module').then( m => m.AvailableDonorsPageModule)
  },
  {
    path: 'donor-detail',
    loadChildren: () => import('./donor-detail/donor-detail.module').then( m => m.DonorDetailPageModule)
  },
  {
    path: 'hospital/alerts',
    loadChildren: () => import('./hospital/alerts/alerts.module').then( m => m.AlertsPageModule)
  },
  {
    path: 'someone-needs-your-blood',
    loadChildren: () => import('./donor/someone-needs-your-blood/someone-needs-your-blood.module').then( m => m.SomeoneNeedsYourBloodPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
