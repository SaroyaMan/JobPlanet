import {Component, Input, OnChanges} from '@angular/core';
import {Question} from '../../models/question.model';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnChanges {


    @Input() questions:Question[];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean;

    p:number = 1;

    constructor() { }

    ngOnChanges() {
        // this.reverse = this.reverse.toString() === 'true';
    }

}