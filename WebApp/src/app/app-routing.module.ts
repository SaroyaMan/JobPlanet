import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthService} from './auth/auth.service';
import {RegisterFormComponent} from './auth/register/register-form/register-form.component';
import {ErrorComponent} from './error/error.component';

const APP_ROUTES:Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [AuthService]},

    {path: 'auth', component: AuthComponent, children: [
            {path: '', redirectTo: 'new', pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
            {path: 'register/:user', component: RegisterFormComponent},
            {path: 'new', component: RegisterComponent},
        ]},

    {path: 'error', component: ErrorComponent},
    {path: '**', redirectTo:'/error'},

];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}