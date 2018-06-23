import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PositionDetailService} from '../position-detail.service';
import {TestSolution} from '../../../../models/test-solution.model';
import {Question} from '../../../../models/question.model';
import {QuestionDetailComponent} from '../../../question-list/question-detail/question-detail.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebApiService} from '../../../web-api.service';
import {Consts} from '../../../consts';

@Component({
    selector: 'app-test-feedback',
    templateUrl: './test-feedback.component.html',
    styleUrls: ['./test-feedback.component.css']
})
export class TestFeedbackComponent implements OnInit, OnDestroy {

    testSolution: TestSolution;

    currentPage = 1;
    localComponentId:number;
    static ComponentID = 0;

    modalConfig:NgbModalOptions = {};

    feedbackForm: FormGroup;
    maxRankingFeedback:number = Consts.MAX_RANKING_FEEDBACK;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private webApiService: WebApiService,
                private positionDetailService: PositionDetailService) { }

    ngOnInit() {

        this.feedbackForm = new FormGroup({}, this.validateScores.bind(this));

        this.route.params.subscribe(
            params => {
                let testSolutionId = +params['testSolutionId'];
                this.testSolution = this.positionDetailService.getTestSolution(testSolutionId);
                this.testSolution.testSolutionQuestions.forEach( tsq => {
                    tsq.question =
                        this.testSolution.test.questionTests
                            .find(qt => qt.questionId === tsq.questionId).question;

                    this.feedbackForm.addControl("score"+tsq.questionId, new FormControl(
                        tsq.score || "", Validators.required));
                    this.feedbackForm.addControl("feedback"+tsq.questionId, new FormControl(
                        tsq.feedback || ""
                    ));
                });
            }
        );

        this.modalConfig.size = 'lg';
        this.modalConfig.windowClass = 'animated slideInUp';

        this.localComponentId = ++TestFeedbackComponent.ComponentID;
    }

    ngOnDestroy() {
        --TestFeedbackComponent.ComponentID;
    }

    openQuestionModal(question: Question) {
        let component = this.modalService.open(QuestionDetailComponent,this.modalConfig).componentInstance;
        question.questionState = question.questionState? question.questionState : null;
        // Pass data to component
        component.question = question;

        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });
    }

    validateScores(group: FormGroup): {[s:string]: boolean} {
        let values = group.value;

        if(Object.keys(values).length == 0) {
            return {'validateScores': true};
        }
        else {
            Object.keys(values).forEach(key => {
                if(key.includes("score") && +values.key <= 0) {
                    return {'validateScores': true};
                }
            });
        }
        return null;
    }

    onSaveFeedback() {
        let values = this.feedbackForm.value;

        for(let tsq of this.testSolution.testSolutionQuestions) {
            tsq.feedback = values['feedback'+tsq.questionId];
            tsq.score = values['score'+tsq.questionId];
        }

        this.webApiService.saveTestSolutionFeedback(this.testSolution)
            .subscribe((testSolution: TestSolution) => {
                this.positionDetailService.setTestSolution(testSolution);
            }
        );
    }
}
