import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserType} from '../auth/models/user-type.enum';
import {WebApiService} from '../shared/web-api.service';
import {QuestionState} from '../shared/enums';
import {CandidateDashboardData} from './dashboard-data.model';
import {QuestionDetailComponent} from '../shared/question-list/question-detail/question-detail.component';
import * as $ from "jquery";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Consts} from '../shared/consts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    userData = null;
    candidateDashboardData:CandidateDashboardData = null;
    questionsDictionary = null;

    protected modalConfig:NgbModalOptions = {
        size: 'lg',
        windowClass: 'animated slideInUp'
    };

    QuestionState = QuestionState;

    constructor(private authService:AuthService,
                private webApiService:WebApiService,
                private modalService: NgbModal,) { }

    ngOnInit() {
        this.userData = this.authService.getUserData();

        if(this.isRecruiter()) {

        }
        else {
            this.webApiService.getCandidateDashboardData().subscribe((dashboardData:CandidateDashboardData) => {
               this.candidateDashboardData = dashboardData;
               this.candidateDashboardData.questions = this.candidateDashboardData.todoListQuestions.map(q => q.question);

                this.candidateDashboardData.publishedQuestionsDiagramData = [];
               for(let q of this.candidateDashboardData.publishedQuestions) {

                   let questionDatum = {
                       name: q.title,
                       value: q.solvedCount,
                   };

                   this.candidateDashboardData.publishedQuestionsDiagramData.push(questionDatum);
                }

                this.questionsDictionary = this.candidateDashboardData.publishedQuestionsDiagramData.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {});

               Consts.IS_DEBUG && console.log(this.candidateDashboardData);
            });
        }
    }

    isRecruiter() {
        return this.authService.UserType === UserType.Recruiter;
    }


    setValueFormatting(c) {
        return `${c.value} Solutions`;
    }


    onSelectPublishedQuestion(event) {

        console.log(event);

        let q = this.candidateDashboardData.publishedQuestions.find(q => q.title === event.name);

        let component = this.modalService.open(QuestionDetailComponent,this.modalConfig).componentInstance;
        q.questionState = QuestionState.PublishedByMe;
        // Pass data to component
        component.question = q;

        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });

    }
}
