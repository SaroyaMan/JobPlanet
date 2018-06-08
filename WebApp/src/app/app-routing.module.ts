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
import {CandidateGuard} from './auth/candidate-guard.service';
import {MyPositionsComponent} from './my-positions/my-positions.component';
import {RecruiterGuard} from './auth/recruiter-guard.service';
import {PositionDetailComponent} from './shared/position-list/position-detail/position-detail.component';
import {CreateTestComponent} from './create-test/create-test.component';
import {TestModeComponent} from './test-mode/test-mode.component';
import {TestModeService} from './test-mode/test-mode.service';
import {TestFeedbackComponent} from './shared/position-list/position-detail/test-feedback/test-feedback.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    // {path: '', redirectTo: '/test-mode', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [AuthService], children: [
            {path: '', component: DashboardComponent},
            {path: 'search-questions', component: SearchQuestionsComponent, data:SearchQuestionSettings.Instance},
            {path: 'published-questions', component: PublishedQuestionsComponent, data:PublishedQuestionSettings.Instance},
            {path: 'my-questions', component: MyQuestionsComponent/*, canActivate: [CandidateGuard]*/},
            {path: 'my-positions', component: MyPositionsComponent/*, canActivate: [RecruiterGuard]*/},
            {path: 'position-detail/:id', component: PositionDetailComponent, children: [
                    {path: 'test-feedback/:testSolutionId', component: TestFeedbackComponent}
                ]},
            {path: 'create-test', component: CreateTestComponent},
            {path: 'create-test/:positionId', component: CreateTestComponent},
        ]
    },
    {path: 'test-mode', component: TestModeComponent, canActivate: [TestModeService]},
    {path: 'auth', component: AuthComponent, children: [
            {path: '', redirectTo: 'new', pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
            {path: 'register/:user', component: RegisterFormComponent},
            {path: 'new', component: RegisterComponent},
        ]
    },
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