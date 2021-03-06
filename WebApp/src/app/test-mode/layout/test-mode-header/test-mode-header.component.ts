import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestModeService, TestOperation} from '../../test-mode.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-test-mode-header',
    templateUrl: './test-mode-header.component.html',
    styleUrls: ['./test-mode-header.component.css']
})
export class TestModeHeaderComponent implements OnInit, OnDestroy {

    personalDetailsSubscription:Subscription;
    timerSubscription:Subscription;
    submitTestSubscription:Subscription;

    currentTimer = 0;
    TestOperation = TestOperation;
    isPersonalDetailsFilled = false;

    isTestSubmitted = false;

    constructor(private testModeService:TestModeService) { }

    ngOnInit() {
        this.timerSubscription = this.testModeService.getTimer().subscribe((timer:number) => {
            this.currentTimer = timer;
        });

        this.personalDetailsSubscription = this.testModeService.personalDetailsFilledListener().subscribe(
            (isFilled) => this.isPersonalDetailsFilled = isFilled);


        this.submitTestSubscription = this.testModeService.onFinishTest.subscribe(() => {
            this.isTestSubmitted = true;
        });
    }

    ngOnDestroy() {
        this.personalDetailsSubscription.unsubscribe();
        this.timerSubscription.unsubscribe();
        this.submitTestSubscription.unsubscribe();
    }

    actionTest(action:TestOperation) {
        this.testModeService.actionTest(action);
    }


}