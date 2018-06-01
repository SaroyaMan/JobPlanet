import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Consts} from '../shared/consts';
import {BlockUiService} from '../utils/block-ui/block-ui.service';
import 'rxjs/Rx';
import {Credentials} from './models/credentials.model';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {RegistrationCandidate, RegistrationRecruiter} from './models/registration.model';
import {CookieService} from 'ngx-cookie';
import {ProfileSettings} from '../models/profile-settings.model';

@Injectable()
export class AuthService implements CanActivate {

    private isLoggedIn = false;
    private userData = null;
    private userType = null;

    public isLoginStateChanged = new EventEmitter<any>();

    constructor(private http:HttpClient,
                private blockUiService:BlockUiService,
                private errorHandlerService:ErrorHandlerService,
                private router:Router,
                private cookieService:CookieService) {

        this.isLoggedIn = !!this.cookieService.get(Consts.AUTH_TOKEN_PROP_NAME);
    }

    login(credentials:Credentials, rememberMe:boolean = false) {

        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.post(`${Consts.WEB_SERVICE_URL}/auth/login`, credentials/*, {headers}*/)
            .map(res => {
                console.log(res);
                let authToken = res[Consts.AUTH_TOKEN_PROP_NAME];
                rememberMe && this.cookieService.put(Consts.AUTH_TOKEN_PROP_NAME, authToken);
                this.isLoggedIn = true;
                return true;
            })
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, "Login Failed");
            });

    }

    checkPassowrd(password:string) {


        return this.http.post(`${Consts.WEB_SERVICE_URL}/auth/checkPassword`, {password: password})
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, "Check Password Failed");
            });
    }

    logout() {
        this.cookieService.remove(Consts.AUTH_TOKEN_PROP_NAME);
        this.isLoggedIn = false;
        this.isLoginStateChanged.emit(null);
        this.router.navigate(["/auth"]);
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
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, null);
            })
            .subscribe(
                (res) => {
                    this.userData = res;
                    this.userType = this.userData["userType"];
                    console.log(this.userData);

                    this.isAuthenticated() && this.isLoginStateChanged.emit(this.userData);
                }
            );
    }

    getUserData() {
        return this.userData;
    }

    setDetails(profile: ProfileSettings) {
        if(this.userData.firstName) this.userData.firstName = profile.firstName;
        if(this.userData.lastName) this.userData.lastName = profile.lastName;
        if(this.userData.allowSendResume != null) this.userData.allowSendResume = profile.allowSendResume;
        if(this.userData.receiveNotifications != null) this.userData.receiveNotifications = profile.receiveNotifications;
    }

    get UserType() {
        return this.userType;
    }

    getToken() {
        // return localStorage.getItem('auth_token');
        return this.cookieService.get(Consts.AUTH_TOKEN_PROP_NAME);
    }
}