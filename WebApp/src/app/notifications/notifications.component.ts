import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsService} from './notifications.service';
import {Notification} from '../models/notification.model';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    notifications:Notification[];

    sortStrategy = 'isViewed';
    orderStrategy:boolean = false;

    constructor(private activeModal:NgbActiveModal,
                private notificationsService:NotificationsService) { }

    ngOnInit() {

        this.notifications = this.notificationsService.getNotifications();

        // this.notificationsService.onNotificationsLoaded.subscribe((notifications:Notification[]) => {
        //    this.notifications = notifications;
        // });

    }


    quitModal() {
        this.activeModal.close();
    }
}
