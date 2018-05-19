import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Consts} from '../../consts';
import {QuestionState} from '../../enums';
import {ActivatedRoute, Data} from '@angular/router';
import {WebApiService} from '../../web-api.service';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from '../../../auth/auth.service';
import {UserType} from '../../../auth/models/user-type.enum';

@Component({
    selector: 'app-question-item',
    templateUrl: './question-item.component.html',
    styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {

    @Input() question: Question;
    @Input() questionState: QuestionState;
    @Input() markAccessModifier:boolean;
    @Output() onRemoveFromTodoList: EventEmitter<any> = new EventEmitter<any>();
    // currentRoute: string = null;
    showQuestionStateButton: boolean;
    dateFormat:string = Consts.DATE_FORMAT;
    QuestionState = QuestionState;

    constructor(private route:ActivatedRoute,
                private webApiService:WebApiService,
                private authService:AuthService,
                private toaster:ToastsManager) {}

    ngOnInit() {
        // this.currentRoute = this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path;
        this.showQuestionStateButton = this.route.snapshot.data.showQuestionStateButton;
        this.route.data.subscribe(
            (data:Data) => {
                this.showQuestionStateButton = data.showQuestionStateButton;
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

    toShowQuestionStateButton() {
        return this.showQuestionStateButton &&
            (this.authService.UserType !== UserType.Recruiter || this.question.questionState === QuestionState.PublishedByMe);
    }
}