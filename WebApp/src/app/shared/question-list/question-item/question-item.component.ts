import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

    @Input() question: Question;
    @Input() questionState: QuestionState;
    @Output() onRemoveFromTodoList: EventEmitter<any> = new EventEmitter<any>();
    currentRoute: string = null;
    showSolveLaterButton: boolean;
    dateFormat:string = Consts.DATE_FORMAT;
    QuestionState = QuestionState;

    constructor(private route:ActivatedRoute,
                private webApiService:WebApiService,
                private toaster:ToastsManager) {}

    ngOnInit() {
        this.currentRoute = this.route.snapshot.routeConfig.path;
        this.showSolveLaterButton = this.route.snapshot.data.showTodoListButton;
        this.route.data.subscribe(
            (data:Data) => {
                this.showSolveLaterButton = data.showTodoListButton;
            }
        );
    }

    onQuestionStateButtonClicked($event:Event, questionId) {

        $event.stopPropagation();

        switch(this.question.questionState) {
            case QuestionState.General:
                this.addQuestionToTodoList(questionId);
                break;
        }
    }

    addQuestionToTodoList(questionId) {
        this.webApiService.addQuestionToTodoList(questionId)
            .subscribe(
                () => {
                    this.toaster.success('Question was successfully added to your Todo-List!', 'Success!');
                    this.question.questionState = QuestionState.InMyTodoList;
                }
            );
    }
}