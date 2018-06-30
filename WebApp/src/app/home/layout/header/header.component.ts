import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ProfileSettingsComponent} from '../../../profile-settings/profile-settings.component';
import {NotificationsService} from '../../../notifications/notifications.service';
import {Notification} from '../../../models/notification.model';
import {NotificationType} from '../../../shared/enums';
import {Consts} from '../../../shared/consts';
import {NotificationsComponent} from '../../../notifications/notifications.component';
import {NotificationDetailComponent} from '../../../notifications/notification-list/notification-detail/notification-detail.component';
import {ModalDialogService} from 'ngx-modal-dialog';
import {UtilsService} from '../../../utils/utils.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


    private modalConfig:NgbModalOptions = {};

    unreadNotifications:Notification[] = [];
    totalUnreadNotifications:number = 0;

    NotificationType = NotificationType;

    dateFormat = Consts.DATE_FORMAT;
    userData = null;

    constructor(private modalDialogService:ModalDialogService,
                private authService:AuthService,
                private modalService: NgbModal,
                private notificationsService:NotificationsService,
                private utilsService:UtilsService) { }

    ngOnInit() {
        this.modalConfig.size = 'lg';
        this.modalConfig.windowClass = 'animated slideInUp';

        this.notificationsService.onNotificationsLoaded.subscribe(((notifications:Notification[]) => {
            this.unreadNotifications = notifications.filter((value, index, array) => value.isViewed === false);
            this.totalUnreadNotifications = this.unreadNotifications.length;
            this.unreadNotifications = this.unreadNotifications.slice(0, 10);
        }));

        this.authService.isLoginStateChanged.subscribe((userData) => {
            this.userData = userData;
        })
    }

    logout() {
        this.authService.logout();
    }

    openSettingsModal() {
        let component = this.modalService.open(ProfileSettingsComponent, this.modalConfig).componentInstance;
        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });
    }

    openNotificationsModal() {
        let component = this.modalService.open(NotificationsComponent, this.modalConfig).componentInstance;
        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });
    }

    openNotificationDetail(index) {

        this.notificationsService.openNotification(this.unreadNotifications[index]);
        // this.activeModal.close();
    }
}
