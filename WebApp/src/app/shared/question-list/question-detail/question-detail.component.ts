import {Component, Input, OnInit} from '@angular/core';
import {WebApiService} from '../../web-api.service';
import {Question} from '../../../models/question.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RefObjectType} from '../../enums';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Utils} from '../../../utils/utils';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

    @Input("question") question:Question;
    file:File = null;
    base64ImgFile = null;

    constructor(private webService:WebApiService,
                private activeModal:NgbActiveModal) { }

    ngOnInit() {
        console.log(this.question);

        this.webService.getAttachment(RefObjectType.Question, this.question.id)
            .subscribe(
                (event ) => {
                    if (event.type === HttpEventType.DownloadProgress) {
                        // This is an download progress event. Compute and show the % done:
                        let percentDone = Math.round(100 * event.loaded / event.total);
                        if(!isNaN(percentDone)) {
                            console.log(`File is ${percentDone}% downloaded.`);
                        }

                    }
                    else if (event instanceof HttpResponse) {
                        // this.file = Utils.blobToFile(event.body as Blob);
                        this.getBase64(event.body)
                            .then(result => {
                                this.base64ImgFile = result;
                                console.log(this.base64ImgFile);
                            });
                        console.log('File is completely downloaded!');
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve(reader.result);
                };
                reader.onerror = function (error) {
                    reject(error);
                };
            }
        );
    }

    onQuitModal() {
        this.activeModal.close();
    }
}