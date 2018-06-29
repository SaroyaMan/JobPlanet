import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RecruiterDashboardData} from '../dashboard-data.model';
import {Consts} from '../../shared/consts';
import {WebApiService} from '../../shared/web-api.service';
import {AuthService} from '../../auth/auth.service';
import {Position} from '../../models/position.model';

@Component({
    selector: 'app-recruiter-dashboard',
    templateUrl: './recruiter-dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {

    recruiterDashboardData:RecruiterDashboardData;
    userData = null;
    selectedPosition:Position = null;

    constructor(private webApiService:WebApiService,
                private authService:AuthService) { }

    ngOnInit() {

        this.userData = this.authService.getUserData();

        this.webApiService.getRecruiterDashboardData().subscribe((dashboardData:RecruiterDashboardData) => {

            this.recruiterDashboardData = dashboardData;
            if(this.recruiterDashboardData && this.recruiterDashboardData.openPositions
                && this.recruiterDashboardData.openPositions.length > 0) {

                this.selectedPosition = this.searchPositionWithStatistics();

            }

            Consts.IS_DEBUG && console.log(this.recruiterDashboardData);
        });
    }

    private searchPositionWithStatistics() {
        for(let position of this.recruiterDashboardData.openPositions) {
            for(let test of position.tests) {
                if(test.testSolutions.length > 0) {
                    for(let ts of test.testSolutions) {
                        if(ts.isEvaluated) {
                            return position;
                        }
                    }
                }
            }
        }
        return null;
    }

}