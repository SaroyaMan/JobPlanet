import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthComponent} from './auth/auth.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BlockUIModule} from 'ng-block-ui';
import {AuthService} from './auth/auth.service';
import {BlockUiService} from './utils/block-ui/block-ui.service';
import {BlockUiComponent} from './utils/block-ui/block-ui.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/layout/header/header.component';
import { MainComponent } from './home/layout/main/main.component';
import { FooterComponent } from './home/layout/footer/footer.component';
import {ToastModule, ToastOptions} from 'ng2-toastr';
import {ErrorHandlerService} from './shared/error-handler.service';
import {CustomToastOption} from './utils/custom-toast-options.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterFormComponent } from './auth/register/register-form/register-form.component';
import { ErrorComponent } from './error/error.component';
import { NavComponent } from './home/layout/nav/nav.component';
import { SearchQuestionsComponent } from './search-questions/search-questions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MomentModule} from 'angular2-moment';
import { SearchFormComponent } from './search-questions/search-form/search-form.component';
import {WebApiService} from './shared/web-api.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {CookieModule} from 'ngx-cookie';
import {StarRatingModule} from 'angular-star-rating';
import { QuestionListComponent } from './shared/question-list/question-list.component';
import { QuestionItemComponent } from './shared/question-list/question-item/question-item.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrderModule} from 'ngx-order-pipe';
import { RankingColorDirective } from './directives/ranking-color.directive';
import { RankValueComponent } from './shared/rank-value/rank-value.component';
import { PublishedQuestionsComponent } from './published-questions/published-questions.component';
import { PublishQuestionFormComponent } from './published-questions/publish-question-form/publish-question-form.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import {FileDropModule} from 'ngx-file-drop';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuestionDetailComponent } from './shared/question-list/question-detail/question-detail.component';
import { QuestionStateButtonComponent } from './shared/question-state-button/question-state-button.component';
import {TruncateModule} from 'ng2-truncate';
import {CKEditorModule} from 'ng2-ckeditor';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {SantisizeHtmlPipe} from './pipes/santisize-html.pipe';
import {CandidateGuard} from './auth/candidate-guard.service';
import {RecruiterGuard} from './auth/recruiter-guard.service';
import {MatRadioModule} from '@angular/material';
import { MyPositionsComponent } from './my-positions/my-positions.component';
import { PublishPositionFormComponent } from './my-positions/publish-position-form/publish-position-form.component';
import { PositionListComponent } from './shared/position-list/position-list.component';
import { PositionItemComponent } from './shared/position-list/position-item/position-item.component';
import { PositionDetailComponent } from './shared/position-list/position-detail/position-detail.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { CreateTestFormComponent } from './create-test/create-test-form/create-test-form.component';
import { PositionCardsComponent } from './shared/position-list/position-cards/position-cards.component';
import { MatchHeightDirective } from './directives/match-height.directive';
import { QuestionCardsComponent } from './shared/question-list/question-cards/question-cards.component';
import { FileUploaderComponent } from './shared/file-uploader/file-uploader.component';
import { PositionContentComponent } from './shared/position-list/position-detail/position-content/position-content.component';
import { PositionTestsComponent } from './shared/position-list/position-detail/position-tests/position-tests.component';
import { TestListComponent } from './shared/test-list/test-list.component';
import { TestItemComponent } from './shared/test-list/test-item/test-item.component';
import { TestDetailComponent } from './shared/test-list/test-detail/test-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AuthComponent,
        BlockUiComponent,
        HomeComponent,
        HeaderComponent,
        MainComponent,
        FooterComponent,
        RegisterFormComponent,
        ErrorComponent,
        NavComponent,
        SearchQuestionsComponent,
        DashboardComponent,
        SearchFormComponent,
        QuestionListComponent,
        QuestionItemComponent,
        RankingColorDirective,
        RankValueComponent,
        PublishedQuestionsComponent,
        PublishQuestionFormComponent,
        MyQuestionsComponent,
        QuestionDetailComponent,
        QuestionStateButtonComponent,
        SantisizeHtmlPipe,
        MyPositionsComponent,
        PublishPositionFormComponent,
        PositionListComponent,
        PositionItemComponent,
        PositionDetailComponent,
        CreateTestComponent,
        CreateTestFormComponent,
        PositionCardsComponent,
        MatchHeightDirective,
        QuestionCardsComponent,
        FileUploaderComponent,
        PositionContentComponent,
        PositionTestsComponent,
        TestListComponent,
        TestItemComponent,
        TestDetailComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        AngularFontAwesomeModule,
        BlockUIModule,
        MomentModule,
        AngularMultiSelectModule,
        NgxPaginationModule,
        OrderModule,
        FileDropModule,
        TruncateModule,
        CKEditorModule,
        ConfirmationPopoverModule.forRoot(),
        NgbModule.forRoot(),
        CookieModule.forRoot(),
        ToastModule.forRoot(),
        StarRatingModule.forRoot(),
        MatRadioModule,
    ],
    providers: [
        AuthService,
        BlockUiService,
        ErrorHandlerService,
        WebApiService,
        CandidateGuard,
        RecruiterGuard,
        {provide: ToastOptions, useClass: CustomToastOption},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    entryComponents: [QuestionDetailComponent, TestDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
