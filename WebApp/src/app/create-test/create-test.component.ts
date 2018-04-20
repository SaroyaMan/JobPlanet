import { Component, OnInit } from '@angular/core';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';
import {SkillMultiSelect} from '../models/skill.model';
import {Question, QuestionMultiSelect} from '../models/question.model';
import {CreateTestQuery} from '../models/create-test-query.model';
import {Test} from '../models/test.model';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-create-test',
    templateUrl: './create-test.component.html',
    styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

    internalQuestions: Question[] = null;
    selectedInternalQuestions: Question[] = [];
    questions: QuestionMultiSelect[] = [];
    skills: SkillMultiSelect[] = [];

    testQuestions: Question[] = [];
    formValues = null;

    sortStrategy = 'rank';
    orderStrategy:boolean = false;
    private searchQuery: CreateTestQuery = null;
    showResults: boolean = false;

    constructor(private webApiService:WebApiService,
                private toaster:ToastsManager,
                private router:Router
    ) { }

    ngOnInit() {

        this.webApiService.getInternalQuestions()
            .subscribe(
                (questions: Question[]) => {
                    this.internalQuestions = questions;
                    for(let q of questions) {
                        let tmpQuestion = new QuestionMultiSelect(q.id, q.title, `Rank of ${q.rank}`);
                        this.questions.push(tmpQuestion);
                    }
                }
            );

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

    createTest(formValues) {
        let skillIds = [];
        for(let skill of formValues.skills) {
            skillIds.push(skill.id);
        }

        this.searchQuery = new CreateTestQuery(
            1,
            skillIds,
            formValues.difficulty,
            formValues.timeFrame,
            formValues.maxQuestions
        );

        this.searchQuestionsForTest(this.searchQuery);

        // Saving the values as they are needed to save the test later
        this.formValues = formValues;
    }

    private searchQuestionsForTest(searchQuery) {
        this.webApiService.searchQuestionsForTest(searchQuery)
            .subscribe(
                (res) => {
                    if(res) {
                        this.testQuestions = res;
                        this.testQuestions.push(...this.selectedInternalQuestions);
                        this.showResults = true;
                    }
                }
            );
    }

    reCreateTest() {
        this.searchQuery.numberOfTries++;
        this.searchQuestionsForTest(this.searchQuery);
    }

    saveTest() {
        let testQuestionsIds: number[] = [];
        for (let q of this.testQuestions) {
            testQuestionsIds.push(q.id);
        }

        const test = new Test(0,
            this.formValues.title, this.formValues.difficulty,
            this.formValues.timeFrame, this.formValues.maxQuestions,
            this.searchQuery.skillIds.join(','), testQuestionsIds.join(','), this.formValues.position
        );

        this.webApiService.saveTest(test)
            .subscribe(
                (res) => {
                    if(res) {
                        this.toaster.success('The Test was successfully created!', 'Success!');
                        this.testQuestions = [];
                        // TODO
                        // Decide what to do when test is done
                        this.router.navigateByUrl(`/home/position-detail/${test.positionId}`);
                    }
                    else {
                        this.toaster.error('Error creating test!');
                    }
                }
            );
    }

    selectedQuestionsSelect(selectedId: number) {
        let q = this.internalQuestions.find(q => q.id === selectedId);
        this.testQuestions.push(q);
        this.selectedInternalQuestions.push(q);
    }

    selectedQuestionsDeSelect(deSelectedId: number) {
        this.testQuestions = this.testQuestions.filter(q => q.id !== deSelectedId);
        this.selectedInternalQuestions = this.selectedInternalQuestions.filter(q => q.id !== deSelectedId);
    }
}
