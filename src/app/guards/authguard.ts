import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/Authentication';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (AuthenticationService.isAuthenticated()) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/signin']);
        return false;
    }
}