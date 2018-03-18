import { Component, OnInit } from '@angular/core';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';

@Component({
    selector: 'app-search-questions',
    templateUrl: './search-questions.component.html',
    styleUrls: ['./search-questions.component.css']
})
export class SearchQuestionsComponent implements OnInit {

    skills = [];

    constructor(private webApiService:WebApiService) { }

    ngOnInit() {

        this.webApiService.getCategoriesSkills()
            .subscribe(
                (skillsCategories: SkillCategory[]) => {
                    for(let category of skillsCategories) {
                        for(let skill of category.skills) {
                            let tmpSkill = {
                                id: skill.id,
                                name: skill.name,
                                category: category.name,
                            };
                            this.skills.push(tmpSkill);

                        }
                    }
                    console.log(this.skills);
                }
            );
    }

}
