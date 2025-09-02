import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticRoleGuard, UserRoleGuard, AddUserRoleGuard, AuthGuard } from '../auth.guard';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  { path: '', redirectTo: 'userlist', pathMatch: 'full' },
  { path: 'userlist',  title: 'User-Dashboard | User List', component: UserlistComponent, canActivate: [UserRoleGuard] },
  { path: 'analytics',  title: 'User-Dashboard | Analytics' , component: AnalyticsComponent, canActivate: [AnalyticRoleGuard] },
  { path: 'adduser',  title: 'User-Dashboard | Add User' , component: AdduserComponent, canActivate: [AddUserRoleGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
