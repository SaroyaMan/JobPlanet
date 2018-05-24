import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestModeService} from '../../test-mode.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-test-mode-header',
    templateUrl: './test-mode-header.component.html',
    styleUrls: ['./test-mode-header.component.css']
})
export class TestModeHeaderComponent implements OnInit, OnDestroy {

    currentTimer = 0;
    timerSubscription:Subscription;

    constructor(private testModeService:TestModeService) { }

    ngOnInit() {
        this.timerSubscription = this.testModeService.getTimer().subscribe((timer:number) => {
            this.currentTimer = timer;
        });
    }

    ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }

    submitTest() {
        this.testModeService.submitTest();
    }

}
