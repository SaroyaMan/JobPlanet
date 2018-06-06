import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {Consts} from '../shared/consts';
import {AuthService} from '../auth/auth.service';
import {WebApiService} from '../shared/web-api.service';
import {UserType} from '../auth/models/user-type.enum';
import {ToastsManager} from 'ng2-toastr';
import {Notification} from '../models/notification.model';
import {NotificationDetailComponent} from './notification-list/notification-detail/notification-detail.component';
import {ModalDialogService} from 'ngx-modal-dialog';
import {UtilsService} from '../utils/utils.service';
import {SFX, SfxService} from '../utils/sfx.service';
import {NotificationType} from '../shared/enums';

@Injectable()
export class NotificationsService implements OnDestroy {

    onNotificationsLoaded = new EventEmitter<Notification[]>();

    private notifications:Notification[] = [];

    private isListeningToNotifications = false;
    private hubConnection:HubConnection;
    private pingsInterval = null;

    constructor(private authService:AuthService,
                private webApiService:WebApiService,
                private toast:ToastsManager,
                private modalDialogService:ModalDialogService,
                private utilsService:UtilsService,
                private sfxService:SfxService) {

        this.authService.isLoginStateChanged.subscribe((userData => {

            if(userData) {
                this.loadNotifications();

                if(userData.userType === UserType.Recruiter) {
                    this.startListenToNotifications(userData);
                }

            }
            else {
                this.unregisterFromNotifications();
            }
        }));

        let subscription = this.toast.onClickToast().subscribe(
            toast => {
                if(toast.data && toast.data['notification']) {
                    this.openNotification(toast.data['notification']);
                    this.toast.clearToast(toast);
                }

            });
    }


    private startListenToNotifications(userData) {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${Consts.WEB_SERVICE_BASE}/notification`)
            .build();

        this.hubConnection.on('ReceiveNotification',
            (notification:Notification) => {
                this.toast.info(`You received ${NotificationType[notification.type]}`, "New Notification",
                    {data: {notification: notification}});
                this.sfxService.playSoundEffect(SFX.Notification);


                this.addNotification(notification);

            });

        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started!');

                this.isListeningToNotifications = true;
                this.hubConnection.invoke('Register', userData.email);


                this.startSendingPings(userData);

            })
            .catch(err => console.log('Error while establishing connection :('));
    }

    private startSendingPings(userData) {
        this.pingsInterval = setInterval(() => {
            this.hubConnection.invoke('Ping', userData.email);
        }, Consts.PING_INTERVAL_IN_MILLISECONDS);
    }

    private loadNotifications() {

        this.webApiService.getNotifications()
            .subscribe(((notifications:Notification[]) => {
                this.notifications = notifications;
                this.notifyAll();
            }));
    }

    openNotification(notification:Notification) {

        this.modalDialogService.openDialog(this.utilsService.getRootViewContainerRef(), {
            title: 'Notification',
            childComponent: NotificationDetailComponent,
            settings: {
                // closeButtonClass: 'close theme-icon-close',
                headerClass: 'modal-header notificationHeaderIcon',
            },
            data: notification,
            actionButtons: [
                {
                    text: 'Approve',
                    buttonClass: 'btn btn-success',
                    onAction: () => this.updateFeedback(notification, true),
                },
                {
                    text: 'Decline',
                    buttonClass: 'btn btn-danger',
                    onAction: () => this.updateFeedback(notification, false),
                },
                {
                    text: 'Later',
                    buttonClass: 'btn btn-info',
                    onAction: () => true,
                }
            ]
        });
        notification.isViewed = true;
        this.notifyAll();
    }

    updateFeedback(notification:Notification, isApproved:boolean) {
        this.webApiService.updateNotificationFeedback(notification.notificationId, isApproved)
            .subscribe((updatedNotifiation:Notification) => {
                notification.approved = isApproved;
            });
        if(isApproved) {
            this.toast.success("Recommendation approved successfully", "Recommendation Approved");
        }
        return true;

    }

    addNotification(notification:Notification) {
        this.notifications.push(notification);
        this.notifyAll();
    }

    getNotifications() {
        return this.notifications.slice(0);
    }

    unregisterFromNotifications() {
        if(this.isListeningToNotifications) {
            this.hubConnection.invoke('Unregister', this.authService.getUserData().email)
                .then(() => this.isListeningToNotifications = false);
        }
        clearInterval(this.pingsInterval);
    }

    ngOnDestroy() {
        clearInterval(this.pingsInterval);
    }

    notifyAll() {
        this.onNotificationsLoaded.emit(this.notifications);
    }
}