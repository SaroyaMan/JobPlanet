import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserType} from '../auth/models/user-type.enum';
import {AuthService} from '../auth/auth.service';
import {Test} from '../models/test.model';

export enum TestOperation {
    Submit = 1,
    Quit = 2,
}

@Injectable()
export class TestModeService {

    private isInTestMode = false;
    private timerInSeconds = 0;
    private interval = null;
    private currentTest:Test = null;

    private timerInSecondsEvent = new EventEmitter<number>();
    private actionTestListener = new EventEmitter<TestOperation>();
    private personalDetailsListener = new EventEmitter<boolean>();

    public onFinishTest = new EventEmitter();

    constructor(private authService:AuthService,
                private router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.UserType === UserType.Recruiter && this.isInTestMode) {
            return true;
        }
        this.router.navigate(["/home"]);
        return false;
    }

    enterTestMode(test:Test) {
        this.isInTestMode = true;
        this.currentTest = test;
        this.router.navigate(["/test-mode"]);

    }

    startTimer() {

        this.setIsPersonalDetailsFilled(true);
        this.timerInSeconds = 0;

        this.interval = setInterval(() => {
            this.timerInSeconds++;
            this.timerInSecondsEvent.emit(this.timerInSeconds);
        }, 1000);

    }

    getTimer() {
        return this.timerInSecondsEvent;
    }

    personalDetailsFilledListener() {
        return this.personalDetailsListener;
    }

    getActionTestListener() {
        return this.actionTestListener;
    }

    getCurrentTest() {
        return this.currentTest;
    }

    stopTimer() {
        clearInterval(this.interval);
        this.interval = null;
        this.timerInSeconds = 0;
    }

    actionTest(operation:TestOperation) {
        this.actionTestListener.emit(operation);
    }

    setIsPersonalDetailsFilled(isFilled:boolean) {
        this.personalDetailsListener.emit(isFilled);
    }

    quitTest() {
        let positionId = this.currentTest.positionId;

        this.stopTimer();
        this.isInTestMode = false;
        this.currentTest = null;
        this.router.navigate(["/home/position-detail/", positionId]);
    }
}