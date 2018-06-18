import {Component, Input, OnInit} from '@angular/core';
import {ModalDialogService} from 'ngx-modal-dialog';
import {Notification} from '../../models/notification.model';
import {UtilsService} from '../../utils/utils.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsService} from '../notifications.service';

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

    @Input() sortBy:string = 'isViewed';
    @Input() reverse:boolean;
    @Input() notifications:Notification[] = [];

    currentPage = 1;

    constructor(private modalDialogService:ModalDialogService,
                private utilsService:UtilsService,
                private activeModal:NgbActiveModal,
                private notificationsService:NotificationsService) { }

    ngOnInit() {
    }

    onNotificationItemClicked(notification:Notification) {

        this.activeModal.close();
        this.notificationsService.openNotification(notification);
    }
}