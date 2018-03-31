import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Consts} from '../../consts';
import {QuestionState} from '../../enums';
import {ActivatedRoute, Data} from '@angular/router';
import {WebApiService} from '../../web-api.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-question-item',
    templateUrl: './question-item.component.html',
    styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {

    @Input() question:Question;
    showSolveLaterButton:boolean;
    dateFormat:string = Consts.DATE_FORMAT;
    QuestionState = QuestionState;

    constructor(private route:ActivatedRoute,
                private webApiService:WebApiService,
                private toaster:ToastsManager) {}

    ngOnInit() {
        console.log(this.question);
        this.showSolveLaterButton = this.route.snapshot.data.showTodoListButton;
        this.route.data.subscribe(
            (data:Data) => {
                this.showSolveLaterButton = data.showTodoListButton;
            }
        );
    }

    onAddQuestionToTodoList($event:Event, questionId) {

        $event.stopPropagation();

        this.webApiService.addQuestionToTodoList(questionId)
            .subscribe(
                (res) => {
                    this.toaster.success('Question was successfully published!', 'Success!');
                }
            );
    }
}