import {Component, OnInit} from '@angular/core';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';
import {Question} from '../models/question.model';
import {QuestionState} from '../shared/enums';

@Component({
    selector: 'app-published-questions',
    templateUrl: './published-questions.component.html',
    styleUrls: ['./published-questions.component.css']
})
export class PublishedQuestionsComponent implements OnInit {

    constructor(private webApiService: WebApiService) {
    }

    skills = [];
    publishedQuestions: Question[] = null;
    sortStrategy = null;
    orderStrategy: boolean = false;
    QuestionState = QuestionState;

    ngOnInit() {

        this.populatePublishedQuestions();

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

    populatePublishedQuestions() {
        this.webApiService.getPublishedQuestions()
            .subscribe(
                (res) => {
                    this.publishedQuestions = res;
                }
            );
    }
}
