import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {Credentials} from '../models/credentials.model';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('f') signInForm:NgForm;

    constructor(private authService:AuthService,
                private router:Router,
                private toast:ToastsManager) {
    }

    ngOnInit() {
    }

    onLogin() {
        let userName = this.signInForm.value.userName;
        let password = this.signInForm.value.password;
        let isRememberMe = this.signInForm.value.rememberMe;

        let credentials:Credentials = new Credentials(userName, password);

        this.authService.login(credentials, isRememberMe)
            .subscribe(
                (response) => {
                    if(response) {
                        this.router.navigate(["/"]);
                    }
                }
            );
    }

}
