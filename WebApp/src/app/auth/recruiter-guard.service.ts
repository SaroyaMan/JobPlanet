import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {UserType} from './models/user-type.enum';

@Injectable()
export class RecruiterGuard implements CanActivate {

    constructor(private authService:AuthService,
                private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.UserType !== UserType.Recruiter) {
            this.router.navigate(["/home"]);
            return false;
        }
        return true;
    }
}