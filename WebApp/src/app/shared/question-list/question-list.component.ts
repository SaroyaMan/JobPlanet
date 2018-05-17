import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../models/question.model';
import {QuestionDetailComponent} from './question-detail/question-detail.component';
import * as $ from 'jquery';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {QuestionState} from '../enums';
import {AuthService} from '../../auth/auth.service';
import {UserType} from '../../auth/models/user-type.enum';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

    @Input() questions:Question[];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean;
    @Input() questionState:QuestionState;
    @Output() onRemoveFromTodoListSecond: EventEmitter<any> = new EventEmitter<any>();
    @Output() onQuestionSolvedSecond: EventEmitter<Question> = new EventEmitter<Question>();

    protected modalConfig:NgbModalOptions = {};

    QuestionState = QuestionState;

    constructor(private modalService: NgbModal,
                private authService:AuthService) { }

    ngOnInit() {

        this.modalConfig.size = 'lg';
        this.modalConfig.windowClass = 'animated slideInUp';
    }

    onQuestionItemClicked(question:Question) {

        let component = this.modalService.open(QuestionDetailComponent,this.modalConfig).componentInstance;
        question.questionState = question.questionState? question.questionState : this.questionState;
        // Pass data to component
        component.question = question;
        component.onQuestionSolved.subscribe(
            (questionId) => {
                this.onQuestionSolvedSecond.emit(this.questions.find(q => q.id == questionId))
            });

        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });
    }

    isRecruiter() {
        return this.authService.UserType === UserType.Recruiter;
    }
}