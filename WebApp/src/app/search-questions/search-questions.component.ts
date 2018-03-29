import { Component, OnInit } from '@angular/core';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';
import {Question} from '../models/question.model';
import {SkillMultiSelect} from '../models/skill.model';

@Component({
    selector: 'app-search-questions',
    templateUrl: './search-questions.component.html',
    styleUrls: ['./search-questions.component.css']
})
export class SearchQuestionsComponent implements OnInit {

    skills:SkillMultiSelect[] = [];
    results:Question[] = null;
    sortStrategy = null;
    orderStrategy:boolean = false;

    constructor(private webApiService:WebApiService) { }

    ngOnInit() {

        this.webApiService.getCategoriesSkills()
            .subscribe(
                (skillsCategories: SkillCategory[]) => {
                    for(let category of skillsCategories) {
                        for(let skill of category.skills) {
                            let tmpSkill = new SkillMultiSelect(skill.id, skill.name, category.name);
                            this.skills.push(tmpSkill);

                        }
                    }
                }
            );
    }

    loadResults(questions: Question[]) {
        this.results = questions;
    }
}
