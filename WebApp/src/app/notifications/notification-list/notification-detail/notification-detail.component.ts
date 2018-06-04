import {Component, ComponentRef} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from 'ngx-modal-dialog';
import {Notification} from '../../../models/notification.model';
import {WebApiService} from '../../../shared/web-api.service';
import {NotificationType, RefObjectType} from '../../../shared/enums';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-notification-detail',
    templateUrl: './notification-detail.component.html',
    styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements IModalDialog  {

    notification:Notification;
    fullDetailedNotification:any;

    resumeUrl;

    NotificationType = NotificationType;

    constructor(private webApiService:WebApiService) { }

    dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        this.notification = options.data;

        switch (this.notification.type) {
            case NotificationType.Recommendation:
                this.webApiService.getRecommendationNotification(this.notification.notificationId)
                    .subscribe((fullDetailedNotification) => {
                        this.fullDetailedNotification = fullDetailedNotification;
                        this.fullDetailedNotification.candidateFullName =
                            this.fullDetailedNotification.candidateFirstName + ' ' +
                            this.fullDetailedNotification.candidateLastName;
                        this.fullDetailedNotification.notification = this.notification;

                        // this.notification.isViewed = true;
                        // this.notificationsService.notifyAll();

                        this.webApiService.getAttachmentContent(RefObjectType.Candidate, this.fullDetailedNotification.candidateId)
                            .subscribe(
                                (event ) => {
                                    if (event.type !== HttpEventType.DownloadProgress && event instanceof HttpResponse && event.body.size > 0) {
                                        this.fullDetailedNotification.resume = {};
                                        this.fullDetailedNotification.resume.fileType = event.body.type;

                                        this.resumeUrl = window.URL.createObjectURL(new Blob([ event.body ], { type : event.body.type }));

                                        this.fullDetailedNotification.resume.fileContent = event.body;
                                    }
                                },
                                (error) => { console.log(error); }
                            );
                    });

        }
    }
}