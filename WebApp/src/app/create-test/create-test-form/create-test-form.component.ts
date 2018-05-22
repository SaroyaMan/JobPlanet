import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SkillMultiSelect} from '../../models/skill.model';
import {WebApiService} from '../../shared/web-api.service';
import {OnClickEvent} from 'angular-star-rating';
import {Position} from '../../models/position.model';
import {QuestionMultiSelect} from '../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-create-test-form',
    templateUrl: './create-test-form.component.html',
    styleUrls: ['./create-test-form.component.css']
})
export class CreateTestFormComponent implements OnInit {

    createTestForm:FormGroup;

    positions: Position[] = null;

    filteredSkillsMultiSelect: SkillMultiSelect[] = [];
    @Input() skillsMultiSelect: SkillMultiSelect[] = null;
    @Input() questionsMultiSelect: QuestionMultiSelect[] = null;
    @Output() onCreateTest: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelectedQuestionsSelect: EventEmitter<number> = new EventEmitter<number>();
    @Output() onSelectedQuestionsDeSelect: EventEmitter<number> = new EventEmitter<number>();

    selectedSkillItems = [];
    skillsDropdownSettings = {};
    selectedQuestionItems = [];
    questionsDropdownSettings = {};

    oldDifficultyLevel: number;
    disabledDropdownSettings: {};

    constructor(private webApiService:WebApiService,
                private route:ActivatedRoute,
                private router:Router) {
    }

    ngOnInit() {

        let positionId = +this.route.snapshot.params['positionId'];
        let isPositionExists = false;

        this.webApiService.getMyPositions()
            .subscribe(
                (positions: Position[]) => {
                    this.positions = positions;

                    if(positionId) {
                        isPositionExists = this.filterSkills(positionId);
                        if(!isPositionExists) {
                            this.router.navigate(['..'], {relativeTo: this.route});
                        }
                    }
                }
            );

        this.createTestForm = new FormGroup({
            title: new FormControl("", Validators.required),
            position: new FormControl(positionId? positionId : "", Validators.required),
            skills: new FormControl("", Validators.required),
            questions: new FormControl(""),
            difficulty: new FormControl("", Validators.required),
            timeFrame: new FormControl("", [
                Validators.required, Validators.min(10), Validators.max(180)
            ]),
            maxQuestions: new FormControl("", [
                Validators.required, Validators.min(1), Validators.max(100)
            ]),
        });

        this.skillsDropdownSettings = {
            singleSelection: false,
            text:"Select Focused Skills",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            searchPlaceholderText: 'Search Skills',
            classes:"myclass custom-class",
            enableCheckAll: false,
            searchAutofocus: true,
            groupBy: "category",
        };

        this.disabledDropdownSettings = {
            text:"Select Focused Skills after choosing a Position",
            disabled: true
        };

        this.questionsDropdownSettings = {
            singleSelection: false,
            text:"Select Private Questions",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            searchPlaceholderText: 'Search Questions',
            classes:"myclass custom-class",
            enableCheckAll: false,
            searchAutofocus: true,
            groupBy: "rank",
        };
    }

    onItemSelect(item: QuestionMultiSelect){
        this.onSelectedQuestionsSelect.emit(item.id);
        this.setMaxQuestionsValidators();
    }

    OnItemDeSelect(item: QuestionMultiSelect){
        this.onSelectedQuestionsDeSelect.emit(item.id);
        this.setMaxQuestionsValidators();
    }

    // Setting validators as selectedQuestionItems length was changed
    setMaxQuestionsValidators() {
        this.createTestForm.controls['maxQuestions'].setValidators([
            Validators.required, Validators.min(this.selectedQuestionItems.length + 1), Validators.max(100)
        ]);
    }

    onCreateTestClicked() {
        this.onCreateTest.emit(this.createTestForm.value);
    }

    onDifficultyLevelChange($event:OnClickEvent) {
        if(this.oldDifficultyLevel === this.createTestForm.value.difficulty) {
            this.createTestForm.patchValue({'difficulty': ""});
            this.oldDifficultyLevel = -1;
        }
        else {
            this.oldDifficultyLevel = $event.rating;
        }
    }

    onlyPositiveValues(event) {
        let key = event.key;
        if(!(  (key >= 0 && key <= 9) ||
                key === 'Tab' ||
                key === 'Backspace' ||
                key === 'ArrowDown' ||
                key === 'ArrowUp' )){
            return false;
        }
    }

    // return a boolean whether that position is exists or not
    filterSkills(positionId):boolean {

        // find the relevant position
        let position = this.positions.find(p => p.id === +positionId);
        if(position) {
            // clear previous skills
            this.selectedSkillItems = [];

            // get new position's skills
            let skills = position.requiredSkills.split(',').map(Number);

            // filter from all skills
            this.filteredSkillsMultiSelect = this.skillsMultiSelect.filter(s => skills.includes(s.id));

            return true;
        }
        return false;
    }
}