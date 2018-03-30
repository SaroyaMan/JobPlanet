import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthService} from './auth/auth.service';
import {RegisterFormComponent} from './auth/register/register-form/register-form.component';
import {ErrorComponent} from './error/error.component';
import {SearchQuestionsComponent} from './search-questions/search-questions.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PublishedQuestionsComponent} from './published-questions/published-questions.component';
import {MyQuestionsComponent} from './my-questions/my-questions.component';
import {PublishedQuestionSettings, SearchQuestionSettings} from './shared/settings';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [AuthService], children: [
            {path: '', component: DashboardComponent},
            {path: 'search-questions', component: SearchQuestionsComponent, data:SearchQuestionSettings.Instance},
            {path: 'published-questions', component: PublishedQuestionsComponent, data:PublishedQuestionSettings.Instance},
            {path: 'my-questions', component: MyQuestionsComponent}
        ]},

    {path: 'auth', component: AuthComponent, children: [
            {path: '', redirectTo: 'new', pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
            {path: 'register/:user', component: RegisterFormComponent},
            {path: 'new', component: RegisterComponent},
        ]},
    {path: 'error', component: ErrorComponent},
    {path: '**', redirectTo: '/error'},

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