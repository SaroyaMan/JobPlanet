import {Component, Input, OnInit} from '@angular/core';
import {WebApiService} from '../../web-api.service';
import {Question} from '../../../models/question.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RefObjectType} from '../../enums';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Utils} from '../../../utils/utils';
import {Consts} from '../../consts';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

    @Input("question") question:Question;
    file:File = null;
    base64ImgFile = null;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private webApiService:WebApiService,
                private activeModal:NgbActiveModal,
                private toaster:ToastsManager) { }

    ngOnInit() {
        console.log(this.question);

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
    }

    onAddQuestionToTodoList(questionId:number) {

        this.webApiService.addQuestionToTodoList(questionId)
            .subscribe(
                () => {
                    this.toaster.success('Question successfully added to Todo List', 'Success');
                    this.quitModal();
                }
            );
    }

    quitModal() {
        this.activeModal.close();
    }
}