import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../shared/consts';
import {BlockUiService} from '../utils/block-ui/block-ui.service';
import 'rxjs/Rx';
import {Credentials} from './models/credentials.model';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {RegistrationCandidate, RegistrationRecruiter} from './models/registration.model';

@Injectable()
export class AuthService {

    private isLoggedIn = false;

    constructor(private http:HttpClient,
                private blockUiService:BlockUiService,
                private errorHandlerService:ErrorHandlerService,
                private router:Router) {

        this.isLoggedIn = !!localStorage.getItem('auth_token');
    }

    login(credentials:Credentials, rememberMe:boolean = false) {

        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.post(`${Consts.WEB_SERVICE_URL}/auth/login`, credentials/*, {headers}*/)
            .map(res => {
                localStorage.setItem('auth_token', res['auth_token']);
                this.isLoggedIn = true;
                return true;
            })
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, "Login Failed");
            })

    }

    logout() {
        localStorage.removeItem('auth_token');
        this.isLoggedIn = false;
        this.router.navigate(["/"]);
    }

    registerCandidate(candidate:RegistrationCandidate) {

        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.post(`${Consts.WEB_SERVICE_URL}/auth/registerCandidate`, candidate)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, "Register Failed");
            })

    }

    registerRecruiter(recruiter:RegistrationRecruiter) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.post(`${Consts.WEB_SERVICE_URL}/auth/registerRecruiter`, recruiter)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, "Register Failed");
            })
    }

    isAuthenticated() {
        return this.isLoggedIn;
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
        if(!this.isAuthenticated()) {
            this.router.navigate(["/auth"]);
            return false;
        }
        return true;
    }
}