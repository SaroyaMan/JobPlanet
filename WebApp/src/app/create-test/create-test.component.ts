import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';
import {SkillMultiSelect} from '../models/skill.model';
import {Question, QuestionMultiSelect} from '../models/question.model';
import {CreateTestQuery} from '../models/create-test-query.model';
import {Test} from '../models/test.model';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {CustomDialogComponent} from '../utils/custom-dialog/custom-dialog.component';
import {ModalDialogService} from 'ngx-modal-dialog';

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
    suggestedQuestions: Question[] = [];
    formValues = null;
    maxQuestions = -1;

    sortStrategy = 'matchingDistance';
    orderStrategy:boolean = false;

    private searchQuery: CreateTestQuery = null;
    showResults: boolean = false;

    constructor(private webApiService:WebApiService,
                private toaster:ToastsManager,
                private router:Router,
                private modalDialogService:ModalDialogService,
                private viewContainer: ViewContainerRef,
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
        this.maxQuestions = formValues.maxQuestions;

        let skillIds = [];
        for(let skill of formValues.skills) {
            skillIds.push(skill.id);
        }

        this.searchQuery = new CreateTestQuery(
            skillIds,
            formValues.difficulty,
            formValues.timeFrame,
        );

        this.searchQuestionsForTest(this.searchQuery);

        // Saving the values as they are needed to save the test later
        this.formValues = formValues;

        $("html").animate({ scrollTop: "0px" });
    }

    private searchQuestionsForTest(searchQuery) {
        this.webApiService.searchQuestionsForTest(searchQuery)
            .subscribe(
                (res) => {
                    if(res) {
                        this.suggestedQuestions = res;
                        this.suggestedQuestions.forEach(q => q.isNotInTest = true);
                        this.showResults = true;
                    }
                }
            );
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
                        this.router.navigate(['/home/position-detail', test.positionId]);
                    }
                    else {
                        this.toaster.error('Error creating test!');
                    }
                }
            );

        return true;
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

    addQuestionToTest(eventObj: any) {
        eventObj.event.stopPropagation();

        if(this.testQuestions.length !== this.maxQuestions) {

            let questionToAdd = this.suggestedQuestions.find(q => q.id == eventObj.questionId);
            this.suggestedQuestions = this.suggestedQuestions.filter(q => q.id != eventObj.questionId);

            questionToAdd.isInTest = true;
            questionToAdd.isNotInTest = false;
            this.testQuestions.push(questionToAdd);
        }
        else {
            this.toaster.info('No more questions can be added!', 'Test is ready');
        }
    }


    removeQuestionFromTest(eventObj: any) {
        eventObj.event.stopPropagation();

        let questionToRemove = this.testQuestions.find(q => q.id == eventObj.questionId);
        this.testQuestions = this.testQuestions.filter(q => q.id != eventObj.questionId);

        questionToRemove.isInTest = false;
        questionToRemove.isNotInTest = true;
        this.suggestedQuestions.push(questionToRemove);
    }

    onSaveTest() {

        this.modalDialogService.openDialog(this.viewContainer, {
            title: `Approve Test`,
            childComponent: CustomDialogComponent,
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            data: 'Are you sure you want to approve the test?',
            actionButtons: [
                {
                    text: 'Confirm',
                    buttonClass: 'btn btn-success',
                    onAction: () => this.saveTest(),
                },
                {
                    text: 'Cancel',
                    buttonClass: 'btn btn-outline-danger',
                    onAction: () => true,
                }
            ]
        });
    }
}
