import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Consts} from '../../consts';
import {ActivatedRoute, Data} from '@angular/router';
import {WebApiService} from '../../web-api.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

    @Input() question:Question;
    showSolveLaterButton:boolean;
    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private route:ActivatedRoute,
                public toaster: ToastsManager,
                private webApiService: WebApiService) {}

    ngOnInit() {
        this.showSolveLaterButton = this.route.snapshot.data.showTodoListButton;
        this.route.data.subscribe(
            (data:Data) => {
                this.showSolveLaterButton = data.showTodoListButton;
            }
        )
    }

    onAddQuestionToTodoList(questionId) {
        this.webApiService.addQuestionToTodoList(questionId)
            .subscribe(
                (res) => {
                    this.toaster.success('Question was successfully published!', 'Success!');
                }
            );
    }
}