import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {UserType} from '../../../auth/models/user-type.enum';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    constructor(public authService:AuthService,
                public router:Router) { }

    ngOnInit() {
    }

    isMenuLoaded() {
        return this.authService.UserType;
    }

    isCandidate() {
        return this.authService.UserType === UserType.Candidate;
    }

    isInPositionDetail() {
        return (this.router.url.includes('position-detail'));
    }
}