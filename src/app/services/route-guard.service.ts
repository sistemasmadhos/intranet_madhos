import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot){
    if(localStorage.getItem('intrnaet-rol') == 'ADMIN')
      return true;
    else{
      this.router.navigate(['/']);
      return false;
    }
    
  }
}