import { Component, OnInit } from '@angular/core';
import {Question} from '../models/question.model';
import {WebApiService} from '../shared/web-api.service';

@Component({
    selector: 'app-my-questions',
    templateUrl: './my-questions.component.html',
    styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {

    constructor(private webApiService: WebApiService) { }

    private todoList: Question[] = null;
    private doneList: Question[] = null;
    questions: Question[] = null;
    sortStrategy = null;
    orderStrategy:boolean = false;
    private isDone = false;

    ngOnInit() {
        // getting to-do list
        this.getMyQuestions(false);
    }

    private getMyQuestions(isDone: boolean) {
        this.webApiService.getMyQuestions(isDone)
            .subscribe(
                (res) => {
                    this.questions = isDone ? this.doneList = res : this.todoList = res;
                }
            );
    }

    onTabChange() {
        this.isDone = !this.isDone;

        if(this.doneList == null) {
            // getting done list on first tab change
            this.getMyQuestions(true);
        }
        else {
            this.questions = this.isDone ? this.doneList : this.todoList;
        }
    }
}