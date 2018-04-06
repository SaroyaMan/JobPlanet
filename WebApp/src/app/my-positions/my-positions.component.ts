import {Component, OnInit} from '@angular/core';
import {PositionStatus} from '../shared/enums';
import {Position} from '../models/position.model';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';

@Component({
    selector: 'app-my-positions',
    templateUrl: './my-positions.component.html',
    styleUrls: ['./my-positions.component.css']
})
export class MyPositionsComponent implements OnInit {

    positions: Position[];
    skills = [];
    sortStrategy = null;
    orderStrategy:boolean = false;

    constructor(private webApiService: WebApiService,) { }

    ngOnInit() {
        this.getPositions();
        this.getSkills();
    }

    private getPositions() {
        this.webApiService.getMyPositions()
            .subscribe(
                (positions: Position[]) => {
                    this.positions = positions;
                    console.log(this.positions);
                }
            );
    }

    private getSkills() {
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

    pushPublishedPosition(position: Position) {
        this.positions.push(position);
    }
}
