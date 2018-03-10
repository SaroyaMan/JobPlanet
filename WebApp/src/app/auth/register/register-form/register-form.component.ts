import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consts} from '../../../shared/consts';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationCandidate} from '../../models/registration.model';
import {AuthService} from '../../auth.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    isCandidate = null;
    signupForm:FormGroup;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private authService:AuthService,
                private toast:ToastsManager) { }

    ngOnInit() {

        this.route.params.subscribe(
            (params:Params) => {
                let userType = params['user'];
                if(Consts.USER_TYPES.indexOf(userType) !== -1) {
                    this.isCandidate = userType === 'candidate';
                }
                else {
                    this.router.navigate(["/"]);
                }
            });

        this.signupForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null),
            'passConfirm': new FormControl(null),
            'firstName': new FormControl(null),
            'lastName': new FormControl(null),
            'resumeUrl': new FormControl(null),
        });
    }

    onRegister() {
        console.log(this.signupForm);

        let email = this.signupForm.value.email;
        let password = this.signupForm.value.password;
        let firstName = this.signupForm.value.firstName;
        let lastName = this.signupForm.value.lastName;

        if(this.isCandidate) {

            let resumeUrl = this.signupForm.value.resumeUrl;
            console.log(resumeUrl);
            let candidate = new RegistrationCandidate(email, password, firstName, lastName, resumeUrl);
            console.log(candidate);
            this.authService.registerCandidate(candidate)
                .subscribe(
                    (response) => {
                        this.toast.success(`${email} successfully registered`, "Registration Succeeded");
                    }
                );
        }
        else {

        }
    }
}