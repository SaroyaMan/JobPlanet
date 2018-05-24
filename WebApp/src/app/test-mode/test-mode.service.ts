import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserType} from '../auth/models/user-type.enum';
import {AuthService} from '../auth/auth.service';
import {Test} from '../models/test.model';

@Injectable()
export class TestModeService {

    private isInTestMode = false;
    private timerInSeconds = 0;
    private interval = null;
    private currentTest:Test = null;

    private timerInSecondsEvent = new EventEmitter<number>();
    private submitTestListener = new EventEmitter();

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
        this.interval = setInterval(() => {
            this.timerInSeconds++;
            this.timerInSecondsEvent.emit(this.timerInSeconds);
        }, 1000);

    }

    getTimer() {
        return this.timerInSecondsEvent;
    }

    getSubmitTestListener() {
        return this.submitTestListener;
    }

    getCurrentTest() {
        return this.currentTest;
    }

    stopTimer() {
        clearInterval(this.interval);
        this.interval = null;
        this.timerInSeconds = 0;
    }

    submitTest() {
        this.submitTestListener.emit();
    }
}