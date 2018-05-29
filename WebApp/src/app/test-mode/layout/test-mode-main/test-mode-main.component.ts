import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Test} from '../../../models/test.model';
import {TestModeService, TestOperation} from '../../test-mode.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Utils} from '../../../utils/utils';
import {RefObjectType} from '../../../shared/enums';
import {WebApiService} from '../../../shared/web-api.service';
import {QuestionTest} from '../../../models/question-test.model';
import {ModalDialogService} from 'ngx-modal-dialog';
import {CustomDialogComponent} from '../../../utils/custom-dialog/custom-dialog.component';
import {TestSolution} from '../../../models/test-solution.model';
import {TestSolutionQuestion} from '../../../models/test-solution-question.model';
import {Subscription} from 'rxjs/Subscription';
import {QuitTestDialogComponent} from '../../quit-test-dialog/quit-test-dialog.component';
import {AuthService} from '../../../auth/auth.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-test-mode-main',
    templateUrl: './test-mode-main.component.html',
    styleUrls: ['./test-mode-main.component.css']
})
export class TestModeMainComponent implements OnInit, OnDestroy {

    test:Test = null;

    solveTestForm:FormGroup;

    ckEditorConfig = {
        uiColor: '#C0C0C0',
        removePlugins: 'forms,insert,about',
        extraPlugins: 'divarea',
        resize_enabled: false,
        height: '30vh',
        // toolbar: [{ name: 'empty', items: [] }],
        removeButtons: 'Iframe,Image,Flash,About,Save'
    };

    currentSeconds:number;

    questionFlags:boolean[] = [];

    isCompleted = false;

    timerSubscription:Subscription;
    currentQt = null;

    constructor(private testModeService:TestModeService,
                private webApiService:WebApiService,
                private modalDialogService:ModalDialogService,
                private viewContainer:ViewContainerRef,
                private authService:AuthService,
                private toast:ToastsManager,) { }

    ngOnInit() {

        this.test = this.testModeService.getCurrentTest();

        this.solveTestForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'firstName': new FormControl(null, [Validators.required]),
            'lastName': new FormControl(null, [Validators.required]),
        });

        this.timerSubscription = this.testModeService.getTimer().subscribe((timer:number) => {
            this.currentSeconds = timer;
        });

        this.testModeService.getActionTestListener()
            .subscribe((operation:TestOperation) => {

                switch(operation) {
                    case TestOperation.Submit:
                        this.submitTest();
                        break;

                    case TestOperation.Quit:
                        this.quitTest();
                        break;
                }
            });


        for(let qt of this.test.questionTests) {

            this.solveTestForm.addControl(`solution_${qt.id}`, new FormControl(null));

            this.webApiService.getAttachmentContent(RefObjectType.Question, qt.question.id)
                .subscribe(
                    (event ) => {
                        if (event.type === HttpEventType.DownloadProgress) {
                            // This is a download progress event. Compute and show the % done:
                            let percentDone = Math.round(100 * event.loaded / event.total);
                            if(!isNaN(percentDone)) {
                            }

                        }
                        else if (event instanceof HttpResponse && event.body.size > 0) {
                            Utils.parseToBase64(event.body)
                                .then(result => {
                                    qt.question.attachment = result;
                                });
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }

        console.log(this.test);
    }

    isPersonalDetailsValid() {

        return this.solveTestForm.valid;
    }

    // checkIfPictureLoaded(event:Event, qt:QuestionTest) {
    //     if(qt.question.attachment == null) event.stopPropagation();
    // }

    saveTest() {

        this.isCompleted = true;
        this.testModeService.stopTimer();

        let values = this.solveTestForm.value;

        let fullName = `${values.firstName} ${values.lastName}`;

        let testSolutionQuestions:TestSolutionQuestion[] = [];
        for(let i = 0; i < this.test.questionTests.length; i++) {
            let questionId = this.test.questionTests[i].questionId;
            let currentSolution = values[`solution_${this.test.questionTests[i].id}`];
            testSolutionQuestions.push(new TestSolutionQuestion(0, questionId, currentSolution));
        }

        let testSolution = new TestSolution(0, this.test.id, fullName, values.email, this.currentSeconds, testSolutionQuestions);

        this.webApiService.saveTestSolution(testSolution)
            .subscribe((ts:TestSolution) => {
                console.log(ts);
            });

        return true;
    }

    submitTest() {

        this.modalDialogService.openDialog(this.viewContainer, {
            title: 'Submit Test',
            childComponent: CustomDialogComponent,
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            data: 'Are you sure you want to submit the test?',
            actionButtons: [
                {
                    text: 'Submit',
                    buttonClass: 'btn btn-success',
                    onAction: () => this.saveTest(),
                },
                {
                    text: 'Cancel',
                    buttonClass: 'btn btn-danger',
                    onAction: () => true,
                }
            ]
        });
    }

    quitTest() {

        let data = {};

        this.modalDialogService.openDialog(this.viewContainer, {
            title: 'Quit Test',
            childComponent: QuitTestDialogComponent,
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            data: data,
            actionButtons: [
                {
                    text: 'Submit',
                    buttonClass: 'btn btn-success',
                    onAction: () => this.checkAuthForQuitTest(data),
                },
                {
                    text: 'Cancel',
                    buttonClass: 'btn btn-danger',
                    onAction: () => true,
                }
            ]
        });
    }

    checkAuthForQuitTest(data) {

        let password = data.password;

        this.authService.checkPassowrd(password).subscribe((isValid) => {
           if(isValid) this.testModeService.quitTest();
           else this.toast.error('Unable to quit from test', 'Wrong Passowrd');
        });

    }

    hasSolution(qt: QuestionTest) {
        let controlValue = this.solveTestForm.controls['solution_' + qt.id].value;
        return controlValue != null && controlValue !== '';
    }

    isFlagged(index:number) {
        return this.questionFlags[index];
    }

    markQuestion(index:number) {
        this.questionFlags[index] = !this.questionFlags[index];
    }

    onPersonalDetailsSubmit() {
        this.testModeService.startTimer();
    }

    ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }
}
