import {Component, OnDestroy, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from './auth/auth.service';
import {NotificationsService} from './shared/notifications.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

    constructor(private toastr: ToastsManager,
                private authService:AuthService,
                private notificationsService:NotificationsService,
                vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnDestroy() {
        this.notificationsService.unregisterFromNotifications();
    }
}
