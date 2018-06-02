import {Component, Input, OnInit} from '@angular/core';
import {ModalDialogService} from 'ngx-modal-dialog';
import {NotificationDetailComponent} from './notification-detail/notification-detail.component';
import {Notification} from '../../models/notification.model';
import {UtilsService} from '../../utils/utils.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
                private activeModal:NgbActiveModal,) { }

    ngOnInit() {
        console.log(this.notifications);
    }

    onNotificationItemClicked(notification:Notification) {

        this.activeModal.close();

        this.modalDialogService.openDialog(this.utilsService.getRootViewContainerRef(), {
            title: 'Notification',
            childComponent: NotificationDetailComponent,
            settings: {
                closeButtonClass: 'close theme-icon-close',
            },
            data: notification,
            actionButtons: [
                {
                    text: 'Submit',
                    buttonClass: 'btn btn-success',
                    onAction: () => this.doNothing(notification),
                },
                {
                    text: 'Cancel',
                    buttonClass: 'btn btn-danger',
                    onAction: () => true,
                }
            ]
        });
    }

    doNothing(notification:Notification) {

    }
}
