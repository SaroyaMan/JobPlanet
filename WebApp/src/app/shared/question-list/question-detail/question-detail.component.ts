import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Consts} from '../../consts';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

    @Input() question:Question;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor() { }

    ngOnInit() {
    }

}