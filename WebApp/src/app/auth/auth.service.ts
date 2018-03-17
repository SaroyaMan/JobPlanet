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
    private userData = null;
    private candidate = false;

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

                let authToken = res['auth_token'];
                localStorage.setItem('auth_token', authToken);
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

    initUserData() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        // let authToken = localStorage.getItem('auth_token');
        // console.log(authToken);
        // headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', `Bearer ${authToken}`);
        // let headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

        this.http.get(`${Consts.WEB_SERVICE_URL}/auth/userData`)
            .finally( () => this.blockUiService.stop() )
            .subscribe(
                (res) => {
                    this.userData = res;
                    this.candidate = this.userData["userType"] === "Candidate";
                    console.log(this.userData);
                }
            );
    }

    isCandidate() {
        return this.candidate;
    }

    // noinspection JSMethodCanBeStatic
    getToken() {
        return localStorage.getItem('auth_token');
    }
}
