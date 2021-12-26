import { Injectable } from '@angular/core';
import {CanActivate, Router, } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {
    // const user = this.authenticationService.userValue;
    // if (user) {
    //     // authorised so return true
    //     return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/account/login'],
    //  // { queryParams: { returnUrl: state.url }}
    //  );
    return false;
}
  
}
