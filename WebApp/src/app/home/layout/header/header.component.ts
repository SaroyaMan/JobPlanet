import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ProfileSettingsComponent} from '../../../profile-settings/profile-settings.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private profileSettingsModalConfig:NgbModalOptions = {};

    constructor(private authService:AuthService,
                private modalService: NgbModal) { }

    ngOnInit() {
        this.profileSettingsModalConfig.size = 'lg';
        this.profileSettingsModalConfig.windowClass = 'animated slideInUp';
    }

    logout() {
        this.authService.logout();
    }

    openSettingsModal() {
        let component = this.modalService.open(ProfileSettingsComponent, this.profileSettingsModalConfig).componentInstance;
        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });
    }
}
