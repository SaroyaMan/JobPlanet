import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Question} from '../../models/question.model';
import {QuestionDetailComponent} from './question-detail/question-detail.component';
import * as $ from "jquery";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {


    @Input() questions:Question[];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean;

    p:number = 1;

    modalConfig:NgbModalOptions = {};

    constructor(private modalService: NgbModal) { }

    ngOnInit() {

        this.modalConfig.size = 'lg';
        this.modalConfig.backdrop = 'static';
        this.modalConfig.windowClass = 'animated slideInUp';
    }

    onQuestionItemClicked(question:Question) {

        let component = this.modalService.open(QuestionDetailComponent,this.modalConfig).componentInstance;

        // Pass data to component
        component.question = question;
        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });

    }

}