import {Injectable, OnDestroy} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {Consts} from './consts';
import {AuthService} from '../auth/auth.service';
import {WebApiService} from './web-api.service';
import {UserType} from '../auth/models/user-type.enum';

@Injectable()
export class NotificationsService implements OnDestroy {

    private isListeningToNotifications = false;
    private hubConnection:HubConnection;
    private pingsInterval = null;

    constructor(private authService:AuthService,
                private webApiService:WebApiService) {

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
    }


    private startListenToNotifications(userData) {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${Consts.WEB_SERVICE_BASE}/notification`)
            .build();

        this.hubConnection.on('ReceiveNotification',
            (data) => {
                console.log(data);
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
            .subscribe((notifications => {
                console.log(notifications);
            }));
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
}