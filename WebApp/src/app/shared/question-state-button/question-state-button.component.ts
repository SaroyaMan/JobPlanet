import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuestionState} from '../enums';

@Component({
    selector: 'app-question-state-button',
    templateUrl: './question-state-button.component.html',
    styleUrls: ['./question-state-button.component.css']
})
export class QuestionStateButtonComponent implements OnInit, OnChanges {

    @Input() questionState: QuestionState;
    @Input() direction:string = 'right';

    text: string;
    faName: string = 'clock-o';
    toolTip: string;
    btnOutlineType: string;
    arrayOfClasses: object;

    constructor() { }

    ngOnInit() {

        this.arrayOfClasses  = {
            'disabled': this.questionState != QuestionState.General ,
            'border-0': this.questionState != QuestionState.General
        };

        this.initValues();
    }

    initValues() {
        switch (this.questionState) {
            case QuestionState.PublishedByMe:
                this.text = 'Published By You';
                this.toolTip = 'You have published this question';
                this.faName = 'upload';
                this.btnOutlineType = 'btn-outline-danger';
                break;
            case QuestionState.InMyDoneList:
                this.text = 'Solved';
                this.toolTip = 'You have solved this question';
                this.faName = 'check-circle';
                this.btnOutlineType = 'btn-outline-success';
                break;
            case QuestionState.InMyTodoList:
                this.text = 'Pending Solution';
                this.toolTip = 'You have added this question to your Todo-List';
                this.faName = 'pencil';
                this.btnOutlineType = 'btn-outline-secondary';
                break;

            case QuestionState.General:
                this.text = 'Solve Later';
                this.toolTip = 'Add question to Todo-List';
                this.faName = 'clock-o';
                this.btnOutlineType = 'btn-outline-primary';
                break;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.questionState.currentValue != changes.questionState.previousValue)
            this.initValues();
    }
}
