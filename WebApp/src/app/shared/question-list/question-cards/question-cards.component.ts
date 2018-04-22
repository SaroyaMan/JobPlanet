import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Consts} from '../../consts';
import {PositionStatus, QuestionState} from '../../enums';
import {Question} from '../../../models/question.model';
import {QuestionDetailComponent} from '../question-detail/question-detail.component';
import * as $ from "jquery";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {UserType} from '../../../auth/models/user-type.enum';
import {AuthService} from '../../../auth/auth.service';

@Component({
    selector: 'app-question-cards',
    templateUrl: './question-cards.component.html',
    styleUrls: ['./question-cards.component.css']
})
export class QuestionCardsComponent implements OnInit {

    @Input() questions:Question[] = [];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean;
    @Input() questionState:QuestionState;
    @Output() onRemoveFromTodoListSecond: EventEmitter<any> = new EventEmitter<any>();
    @Output() onQuestionSolvedSecond: EventEmitter<Question> = new EventEmitter<Question>();

    numOfChars = Consts.NUM_OF_CHARS - 35;
    dateFormat:string = Consts.DATE_FORMAT;

    modalConfig:NgbModalOptions = {};

    constructor(private modalService:NgbModal,
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

