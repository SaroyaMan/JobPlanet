import {Component, Input, OnInit} from '@angular/core';
import {NotificationType} from '../../../shared/enums';
import {Consts} from '../../../shared/consts';
import {Notification} from '../../../models/notification.model';

@Component({
    selector: 'app-notification-item',
    templateUrl: './notification-item.component.html',
    styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

    @Input() notification:Notification;

    NotificationType = NotificationType;

    dateFormat = Consts.DATE_FORMAT;

    constructor() { }

    ngOnInit() {
    }

}
