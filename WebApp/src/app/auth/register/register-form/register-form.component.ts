import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Consts} from '../../../shared/consts';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationCandidate, RegistrationRecruiter} from '../../models/registration.model';
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
            'password': new FormControl(null, [Validators.required]),
            'passConfirm': new FormControl(null, [Validators.required]),
            'firstName': new FormControl(null, [Validators.required]),
            'lastName': new FormControl(null, [Validators.required]),
            'resumeUrl': new FormControl(null),
        });
    }

    //Creating custom validator
    isCandidateValidation(control:FormControl): {[s: string]: boolean} {
        console.log(control);
        if(this.isCandidate) {
            if(control.value == null || control.value.toString().length === 0) {
                return {'empty': true}
            }
        }
        return null;
    }


    onRegister() {
        console.log(this.signupForm);

        let email = this.signupForm.value.email;
        let password = this.signupForm.value.password;
        let firstName = this.signupForm.value.firstName;
        let lastName = this.signupForm.value.lastName;

        if(this.isCandidate) {
            let resumeUrl = this.signupForm.value.resumeUrl;
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
            let recruiter = new RegistrationRecruiter(email, password, firstName, lastName);

            this.authService.registerRecruiter(recruiter)
                .subscribe(
                    (response) => {
                        this.toast.success(`${email} successfully registered`, "Registration Succeeded");
                    }
                );
        }
    }
}