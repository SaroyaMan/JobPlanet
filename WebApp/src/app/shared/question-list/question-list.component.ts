import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../models/question.model';
import {QuestionDetailComponent} from './question-detail/question-detail.component';
import * as $ from 'jquery';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {QuestionState} from '../enums';
import {ActivatedRoute} from '@angular/router';

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
    @Output() onRemoveFromTodoList: EventEmitter<any> = new EventEmitter<any>();

    currentRoute: string = null;
    QuestionState = QuestionState;

    p:number = 1;

    modalConfig:NgbModalOptions = {};

    constructor(private modalService: NgbModal,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.currentRoute = this.route.snapshot.routeConfig.path;

        this.modalConfig.size = 'lg';
        this.modalConfig.backdrop = 'static';
        this.modalConfig.windowClass = 'animated slideInUp';
    }

    onQuestionItemClicked(question:Question) {

        let component = this.modalService.open(QuestionDetailComponent,this.modalConfig).componentInstance;
        question.questionState = question.questionState? question.questionState : this.questionState;
        // Pass data to component
        component.question = question;
        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });
    }

    removeFromTodoList() {

    }
}