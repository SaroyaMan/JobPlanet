import {Component, OnDestroy, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from './auth/auth.service';
import {NotificationsService} from './notifications/notifications.service';
import {UtilsService} from './utils/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

    constructor(private toastr: ToastsManager,
                private authService:AuthService,
                private notificationsService:NotificationsService,
                private utilsService:UtilsService,
                vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);

        this.utilsService.setRootViewContainerRef(vRef);
    }

    ngOnDestroy() {
        this.notificationsService.unregisterFromNotifications();
    }
}
