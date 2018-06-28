import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserType} from '../auth/models/user-type.enum';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private authService:AuthService) { }

    ngOnInit() {
    }

    isRecruiter() {
        return this.authService.UserType === UserType.Recruiter;
    }
}