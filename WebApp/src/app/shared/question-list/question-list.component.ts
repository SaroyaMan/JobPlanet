import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
export class QuestionListComponent implements OnInit, OnDestroy {
    
    @Input() questions:Question[];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean = false;
    @Input() questionState:QuestionState;
    @Input() numOfElementsToDisplay = 10;
    @Input() small:boolean;
    @Input() showPagination:boolean = true;
    @Output() onAddToTestSecond: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRemoveFromTestSecond: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRemoveFromTodoListSecond: EventEmitter<any> = new EventEmitter<any>();
    @Output() onQuestionSolvedSecond: EventEmitter<Question> = new EventEmitter<Question>();

    protected modalConfig:NgbModalOptions = {
        size: 'lg',
        windowClass: 'animated slideInUp'
    };

    localComponentId:number;
    currentPage = 1;

    static ComponentID = 0;

    // componentId = ((Math.random() * 1000) + 1).toString();

    QuestionState = QuestionState;

    constructor(private modalService: NgbModal,
                private authService:AuthService) {}



    ngOnInit() {

        this.localComponentId = ++QuestionListComponent.ComponentID;
    }

    ngOnDestroy() {
        --QuestionListComponent.ComponentID;
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