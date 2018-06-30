import { Component, OnInit } from '@angular/core';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';
import {Question} from '../models/question.model';
import {ParsedSkills, SkillMultiSelect} from '../models/skill.model';
import {QuestionState} from '../shared/enums';

@Component({
    selector: 'app-search-questions',
    templateUrl: './search-questions.component.html',
    styleUrls: ['./search-questions.component.css']
})
export class SearchQuestionsComponent implements OnInit {

    skills:SkillMultiSelect[] = [];
    results:Question[] = null;
    sortStrategy = 'questionState';
    orderStrategy:boolean = false;
    displayOnlyGeneral:boolean = false;

    constructor(private webApiService:WebApiService) { }

    ngOnInit() {

        this.webApiService.getCategoriesSkills()
            .subscribe(
                (skillsObj:ParsedSkills) => {
                    this.skills = skillsObj.skillsForMultiSelect;
                }
            );
    }

    loadResults(questions: Question[]) {
        this.results = questions;

        if(this.displayOnlyGeneral) {
            this.results = this.results.filter(q => q.questionState === QuestionState.General);
        }
    }
}