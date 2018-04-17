import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SkillMultiSelect} from '../../models/skill.model';
import {WebApiService} from '../../shared/web-api.service';
import {OnClickEvent} from 'angular-star-rating';
import {Position} from '../../models/position.model';
import {QuestionMultiSelect} from '../../models/question.model';

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

    constructor(private webApiService:WebApiService) {
    }

    ngOnInit() {
        this.webApiService.getMyPositions()
            .subscribe(
                (positions: Position[]) => {
                    this.positions = positions;
                }
            );

        this.createTestForm = new FormGroup({
            title: new FormControl("", Validators.required),
            position: new FormControl("", Validators.required),
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
            text:"Select Internal Questions",
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
    }

    OnItemDeSelect(item: QuestionMultiSelect){
        this.onSelectedQuestionsDeSelect.emit(item.id);
    }

    onCreateTestClicked() {
        this.onCreateTest.emit(this.createTestForm.value);

        // this.createTestForm.reset();

        // resetting the form causes star-rating to throw an error so we do it manually
        // this.createTestForm.reset({
        //     'difficulty': "",
        //     'timeFrame': "",
        //     'maxQuestions': "",
        //     'position': "",
        //     'questions': "",
        //     'skills': "",
        //     'title': "",
        // });
        // this.createTestForm.controls['difficulty'].markAsPristine();
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
        const key = event.key;
        if(!(  (key >= 0 && key <= 9) ||
                key === 'Backspace' ||
                key === 'ArrowDown' ||
                key === 'ArrowUp' )){
            return false;
        }
    }

    filterSkills(positionId) {
        // clear previous skills
        this.selectedSkillItems = [];

        // get new position's skills
        const position = this.positions.find(p => p.id === +positionId);
        const skills = position.requiredSkills.split(',').map(Number);

        // filter from all skills
        this.filteredSkillsMultiSelect = this.skillsMultiSelect.filter(s => skills.includes(s.id));
    }
}