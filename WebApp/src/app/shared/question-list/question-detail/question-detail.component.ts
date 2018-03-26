import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Consts} from '../../consts';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

    @Input() question:Question;
    showSolveLaterButton:boolean;
    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private route:ActivatedRoute) {}

    ngOnInit() {
        this.showSolveLaterButton = this.route.snapshot.data.showTodoListButton;
        this.route.data.subscribe(
            (data:Data) => {
                this.showSolveLaterButton = data.showTodoListButton;
            }
        )

    }
}