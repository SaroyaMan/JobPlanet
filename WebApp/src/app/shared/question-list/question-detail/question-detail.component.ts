import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

    @Input("question") question:Question;
    candidateQuestion:CandidateQuestion = null;

    base64ImgFile = null;

    ckEditorContent:string;
    ckEditorConfig = {
        uiColor: '#C0C0C0',
        removePlugins: 'forms,insert,about',
        extraPlugins: 'divarea',
        resize_enabled: false,
        height: '20vh',
        // toolbar: [{ name: 'empty', items: [] }],
        removeButtons: 'Iframe,Image,Flash,About,Save'
    };

    dateFormat:string = Consts.DATE_FORMAT;

    QuestionState = QuestionState;

    questionStatistics: CandidateQuestion[] = null;
    notRanked: boolean;

    currPage = 1;

    reviewQuestionForm:FormGroup;
    isCandidate;

    @ViewChild('closeReviewModal') closeReviewModal:ElementRef;
    @ViewChild('popOver') public popover: NgbPopover;

    @Output() onQuestionSolved: EventEmitter<number> = new EventEmitter<number>();

    constructor(private webApiService:WebApiService,
                private activeModal:NgbActiveModal,
                private toaster:ToastsManager,
                private authService:AuthService) { }

    ngOnInit() {

        this.question.questionState = this.question.questionState || QuestionState.General;

        if(this.isCandidate = this.authService.UserType === UserType.Candidate) {
            this.webApiService.getCandidateQuestion(this.question.id)
                .subscribe((candidateQuestion:CandidateQuestion)=> {
                    this.candidateQuestion = candidateQuestion;
                    console.log(this.candidateQuestion);
                });
        }

        if(this.question.questionState === QuestionState.PublishedByMe || this.question.questionState === QuestionState.InMyDoneList) {
            this.getQuestionStatistics();
        }

        this.webApiService.getAttachmentContent(RefObjectType.Question, this.question.id)
            .subscribe(
                (event ) => {
                    if (event.type === HttpEventType.DownloadProgress) {
                        // This is a download progress event. Compute and show the % done:
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

        this.reviewQuestionForm = new FormGroup({

            reviewRank: new FormControl(0, [Validators.required, Validators.min(1)]),
            reviewDesc: new FormControl(null, [Validators.max(500)],)
        });
    }

    private getQuestionStatistics() {
        this.webApiService.getQuestionStatistics(this.question.id)
            .subscribe((statistics: CandidateQuestion[]) => {
                this.questionStatistics = statistics;
                this.notRanked = statistics.find(q => q.ranked !== null) === undefined;
            });
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
        if(this.popover) {
            if(this.popover.isOpen()) this.popover.close();
            else this.popover.open();
        }
    }

    // closePopover() {
    //     if(this.popover) {
    //         if(this.popover.isOpen()) this.popover.close();
    //     }
    // }

    onPostSolution() {

        let solutionData = {
            questionId: this.question.id,
            solution: this.ckEditorContent,
        };

        this.webApiService.postSolution(solutionData)
            .subscribe(
                (cq:CandidateQuestion) => {
                    this.candidateQuestion = cq;
                    this.question.questionState = QuestionState.InMyDoneList;
                    this.getQuestionStatistics();
                    this.onQuestionSolved.emit(this.question.id);
                    this.toaster.success('Solution Sent!', 'Question Solved');
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

    onSubmitReview() {
        let values = this.reviewQuestionForm.value;

        let reviewObj = {
            questionId: this.question.id,
            rank: values.reviewRank,
            review: values.reviewDesc,
        };

        this.webApiService.postReview(reviewObj)
            .subscribe(
                (cq:CandidateQuestion) => {
                    this.candidateQuestion = cq;
                    this.toaster.success('Review Sent Successfully', 'Review Sent');

                    // Close the modal ...
                    (this.closeReviewModal.nativeElement as HTMLButtonElement).click();
                }
            )
    }

    toShowQuestionStateButton() {
        return this.authService.UserType !== UserType.Recruiter || this.question.questionState === QuestionState.PublishedByMe
    }

    checkIfPictureLoaded(event) {
        if(this.base64ImgFile == null) event.stopPropagation();
    }

    isRecruiter() {
        return this.authService.UserType === UserType.Recruiter;
    }
}