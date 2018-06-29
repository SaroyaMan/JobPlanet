import {Component, Input, OnInit} from '@angular/core';
import {TestSolution} from '../../../../models/test-solution.model';
import {WebApiService} from '../../../web-api.service';
import {Position} from '../../../../models/position.model';
import {Consts} from '../../../consts';
import {NavigationEnd, Router} from '@angular/router';
import {PositionDetailService} from '../position-detail.service';

@Component({
    selector: 'app-pending-solutions',
    templateUrl: './pending-solutions.component.html',
    styleUrls: ['./pending-solutions.component.css']
})
export class PendingSolutionsComponent implements OnInit {

    @Input() position:Position;
    solutions: TestSolution[] = [];

    dateFormat:string = Consts.DATE_FORMAT;
    showList = true;
    currentPage = 1;

    constructor(private webApiService: WebApiService,
                private positionDetailService: PositionDetailService,
                private router:Router,) { }

    ngOnInit() {

        this.showList = !this.router.url.includes("test-feedback");

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Navigation Ended Successfully.
                this.showList = !event.url.includes("test-feedback");
            }
        });

        this.solutions = this.positionDetailService.getTestSolutions();
        this.solutions.sort((a,b) => {
            return +new Date(b.dateCreated) - +new Date(a.dateCreated);
        });

        this.positionDetailService.testSolutionChanged
            .subscribe((testSolution: TestSolution) => {

                let solutionIndex = this.solutions.findIndex(s => s.id === testSolution.id);
                if(solutionIndex !== -1) {
                    this.solutions[solutionIndex] = testSolution;
                }
                this.router.navigate(['/home/position-detail', this.position.id, 'solutions']);
            })
    }
}
