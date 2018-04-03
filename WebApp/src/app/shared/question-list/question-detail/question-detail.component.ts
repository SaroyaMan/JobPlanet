import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {WebApiService} from '../../web-api.service';
import {Question} from '../../../models/question.model';
import {NgbActiveModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {QuestionState, RefObjectType} from '../../enums';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Utils} from '../../../utils/utils';
import {Consts} from '../../consts';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from '../../../auth/auth.service';
import {UserType} from '../../../auth/models/user-type.enum';
import {CandidateQuestion} from '../../../models/candidate-question.model';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

    @Input("question") question:Question;
    candidateQuestion:CandidateQuestion = null;

    file:File = null;
    base64ImgFile = null;

    ckEditorContent:string;
    ckEditorConfig = {
        uiColor: '#C0C0C0',
        removePlugins: 'forms,insert,about',
        extraPlugins: 'divarea',
        resize_enabled: false,
        height: 150,
        // toolbar: [{ name: 'empty', items: [] }],
        removeButtons: 'Iframe,Image,Flash,About,Save'
    };

    dateFormat:string = Consts.DATE_FORMAT;
    @ViewChild('popOver') public popover: NgbPopover;

    constructor(private webApiService:WebApiService,
                private activeModal:NgbActiveModal,
                private toaster:ToastsManager,
                private authService:AuthService) { }

    ngOnInit() {

        this.webApiService.getAttachment(RefObjectType.Question, this.question.id)
            .subscribe(
                (event ) => {
                    if (event.type === HttpEventType.DownloadProgress) {
                        // This is an download progress event. Compute and show the % done:
                        let percentDone = Math.round(100 * event.loaded / event.total);
                        if(!isNaN(percentDone)) {
                            console.log(`File is ${percentDone}% downloaded.`);
                        }

                    }
                    else if (event instanceof HttpResponse && event.body.size > 0) {
                        Utils.parseToBase64(event.body)
                            .then(result => {
                                this.base64ImgFile = result;
                            });
                        console.log('File is completely downloaded!');
                    }
                },
                (error) => {
                    console.log(error);
                }
            );

        if(this.authService.UserType === UserType.Candidate) {
            this.webApiService.getCandidateQuestion(this.question.id)
                .subscribe((candidateQuestion:CandidateQuestion)=> {
                    this.candidateQuestion = candidateQuestion;
                    console.log(this.candidateQuestion);
                    this.ckEditorContent = this.candidateQuestion && this.candidateQuestion.answer;
                });
        }
    }

    onQuestionStateButtonClicked() {

        switch(this.question.questionState) {
            case QuestionState.General:
                this.addQuestionToTodoList(this.question.id);
                break;
        }


    }



    // @HostListener('document:keydown', ['$event'])
    // handleKeyboardEvent(event: KeyboardEvent) {
    //     console.log(event);
    //     if (event.keyCode === 27) {
    //         console.log('Escape!');
    //
    //         event.stopPropagation();
    //     }
    // }

    quitModal() {
        this.activeModal.close();
    }

    togglePopover() {
        if(this.popover.isOpen()) this.popover.close();
        else this.popover.open();
    }

    closePopover() {
        if(this.popover.isOpen()) this.popover.close();
    }

    onPostSolution() {

        let solutionData = {
            questionId: this.question.id,
            solution: this.ckEditorContent,
        };

        this.webApiService.publishAnswer(solutionData)
            .subscribe(
                (cq:any) => {
                    console.log(cq);
                }
            );
    }


    private addQuestionToTodoList(questionId:number) {
        this.webApiService.addQuestionToTodoList(questionId)
            .subscribe(
                () => {
                    this.toaster.success('Question successfully added to Todo List', 'Success');
                    this.quitModal();
                }
            );
    }

    isSolved() {
        return this.candidateQuestion
            && this.candidateQuestion.isDone
            && this.candidateQuestion.solution != null;
    }
}