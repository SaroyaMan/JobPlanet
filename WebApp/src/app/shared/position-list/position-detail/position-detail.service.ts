import {Injectable} from '@angular/core';
import {Position} from '../../../models/position.model';
import {Router} from '@angular/router';
import {TestSolution} from '../../../models/test-solution.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PositionDetailService {

    testSolutionChanged = new Subject<TestSolution>();

    private position: Position = null;

    constructor(private router: Router) { }

    public setPosition(position: Position) {
        this.position = position;
    }

    public getPosition() {
        return this.position;
    }

    public getTestSolutions() {
        let solutions = [];
        for(let t of this.position.tests) {
            for(let ts of t.testSolutions) {
                ts.test = t;
            }
            solutions.push(...t.testSolutions);
        }
        return solutions;
    }

    public getTestSolution(testSolutionId:number) {
        for(let test of this.position.tests) {
            let testSolution = test.testSolutions.find(ts => ts.id === testSolutionId);
            if(testSolution != undefined) {
                return testSolution;
            }
        }
    }

    public setTestSolution(testSolution: TestSolution) {

        let testIndex = this.position.tests.findIndex(t => t.id === testSolution.testId);
        if(testIndex != undefined) {
            let testSolutionIndex =
                this.position.tests[testIndex].testSolutions.findIndex(s => s.id === testSolution.id);

            if(testSolutionIndex != undefined) {
                this.position.tests[testIndex].testSolutions[testSolutionIndex] = testSolution;
                this.position.tests[testIndex].testSolutions[testSolutionIndex].test = this.position.tests[testIndex];

                this.testSolutionChanged.next(this.position.tests[testIndex].testSolutions[testSolutionIndex]);
            }
        }
    }
}