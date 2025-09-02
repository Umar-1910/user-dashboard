import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let message = localStorage.getItem('login') === 'ok';

      if(message){
        return true;
      }
      else{
        this.router.navigate(['/authentication/login']);
        return false;
      }

  }
  
}



@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  
  constructor(private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let name = localStorage.getItem('name');
      let list = JSON.parse(localStorage.getItem('list') || '[]');
      let role = list.find((user: any) => user.username === name);

      if(role.userlist){
        return true;
      }
      else{

        if(role.analytics){
          this.router.navigate(['/dashboard/analytics']); 
        }else{
         this.router.navigate(['/dashboard/adduser']); 
        }

        return false;
      }

  }
  
}



@Injectable({
  providedIn: 'root'
})
export class AnalyticRoleGuard implements CanActivate {
  
  constructor(private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let name = localStorage.getItem('name');
      let list = JSON.parse(localStorage.getItem('list') || '[]');
      let role = list.find((user: any) => user.username === name);
      
      if(role.analytics){
        return true;
      }
      else{
        
        if(role.userlist){
          this.router.navigate(['/dashboard/userlist']); 
        }else{
         this.router.navigate(['/dashboard/adduser']); 
        }
        
        return false;
      }

  }
  
}



@Injectable({
  providedIn: 'root'
})
export class AddUserRoleGuard implements CanActivate {
  
  constructor(private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let name = localStorage.getItem('name');
      let list = JSON.parse(localStorage.getItem('list') || '[]');
      let role = list.find((user: any) => user.username === name);

      if(role.adduser){
        return true;
      }
      else{

        if(role.userlist){
          this.router.navigate(['/dashboard/userlist']); 
        }else{
         this.router.navigate(['/dashboard/analytics']); 
        }

        return false;
      }

  }
  
}