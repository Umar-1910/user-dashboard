import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'authentication', loadChildren: () => 
      import('./authentication/authentication.module').then(a => a.AuthenticationModule) },

  { path: 'dashboard', loadChildren: () =>
      import('./dashboard/dashboard.module').then(d => d.DashboardModule), 
    canActivate: [AuthGuard]
  },
      
  { path: '', redirectTo: 'authentication', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
