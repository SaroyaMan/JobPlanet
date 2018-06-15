import { Component, OnInit } from '@angular/core';
import {Question} from '../models/question.model';
import {WebApiService} from '../shared/web-api.service';
import {QuestionState} from '../shared/enums';
import {SkillCategory} from '../models/skill-category.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-my-questions',
    templateUrl: './my-questions.component.html',
    styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {

    constructor(private webApiService: WebApiService,
                private activatedRoute:ActivatedRoute,
                private router:Router,) { }

    tabType:string = null;
    tabOptions = ['todo-list', 'done-list'];

    listType = '1';
    private todoList: Question[] = null;
    private doneList: Question[] = null;
    questions: Question[] = null;
    skills = [];
    sortStrategy = null;
    orderStrategy:boolean = false;
    isDone = false;
    QuestionState = QuestionState;

    currentTab:number = 0;

    ngOnInit() {


        this.tabType = this.activatedRoute.snapshot.params['type'];
        if(this.tabOptions.includes(this.tabType) == false)
            this.goToDefaultPage();
        this.activatedRoute.params.subscribe(params => {
            this.tabType = this.activatedRoute.snapshot.params['type'];
            if(this.tabOptions.includes(this.tabType) == false)
                this.goToDefaultPage();
        });


        // getting some list
        this.isDone = this.tabType !== this.tabOptions[0];
        this.currentTab = this.isDone ? 2 : 1;
        this.getMyQuestions(this.isDone);

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

    onTabChange(tab) {

        if(this.currentTab != tab) {
            this.currentTab = tab;

            this.isDone = !this.isDone;

            if (this.doneList == null || this.todoList == null) {
                // load the list which was not loaded before
                this.getMyQuestions(this.isDone);
            }
            else {
                this.questions = this.isDone ? this.doneList : this.todoList;
            }
        }
    }

    removeFromTodoList(eventObj: any) {
        eventObj.event.stopPropagation();

        this.webApiService.removeFromTodoList(eventObj.questionId)
            .subscribe(
                () => {
                    const index = this.questions.findIndex(q => q.id == eventObj.questionId);
                    this.questions.splice(index,1);
                }
            )
    }

    questionSolved(question: Question) {
        this.questions = this.todoList = this.todoList.filter(q => q.id != question.id);
        if(this.doneList != null){
            this.doneList.push(question);
        }
    }

    private goToDefaultPage() {
        this.router.navigate([`../${this.tabOptions[0]}`], {relativeTo: this.activatedRoute});
    }
}