import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {UserType} from '../../../auth/models/user-type.enum';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    constructor(public authService:AuthService) { }

    ngOnInit() {
    }


    isCandidate() {
        return this.authService.UserType === UserType.Candidate;
    }
}