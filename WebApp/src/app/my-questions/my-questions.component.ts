import { Component, OnInit } from '@angular/core';
import {Question} from '../models/question.model';
import {WebApiService} from '../shared/web-api.service';
import {QuestionState} from '../shared/enums';
import {SkillCategory} from '../models/skill-category.model';

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
    skills = [];
    sortStrategy = null;
    orderStrategy:boolean = false;
    isDone = false;
    QuestionState = QuestionState;

    ngOnInit() {
        // getting to-do list
        this.getMyQuestions(false);

        this.webApiService.getCategoriesSkills()
            .subscribe(
                (skillsCategories: SkillCategory[]) => {
                    for (const category of skillsCategories) {
                        for (const skill of category.skills) {
                            const tmpSkill = {
                                id: skill.id,
                                name: skill.name,
                                category: category.name,
                            };
                            this.skills.push(tmpSkill);
                        }
                    }
                }
            );
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

    removeFromTodoList(eventObj: any) {

        eventObj.event.stopPropagation();

        this.webApiService.removeFromTodoList(eventObj.questionId)
            .subscribe(
                (res) => {
                    const index = this.questions.findIndex(q => q.id == eventObj.questionId);
                    this.questions.splice(index,1);
                }
            )
    }
}