import {Component, Input, OnInit} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {Test} from '../../../../models/test.model';
import {Position} from '../../../../models/position.model';
import {PositionDetailService} from '../position-detail.service';
import {TestSolution} from '../../../../models/test-solution.model';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    @Input() position: Position;

    tests: Test[] = [];
    currTestId: number = -1;
    data: any[] = [];
    testsData: {data: any[]}[] = [];

    constructor(private positionDetailService: PositionDetailService,) {}

    onSelect(event) {
    }

    onActivate(event) {
    }

    ngOnInit() {
        // adding tests that have solutions and at least one solution is evaluated
        this.initTests();

        if(this.tests.length > 0)
            this.setTest(this.tests[0]);

        // refreshing the data in case a new feedback was provided and recruiter comes back to statistics tab
        this.positionDetailService.testSolutionChanged
            .subscribe((testSolution: TestSolution) => {
                this.updateDataOnNewFeedback(testSolution);
            });
    }

    private initTests() {
        for(let t of this.position.tests)
            if(t.testSolutions.length > 0)
                for(let ts of t.testSolutions)
                    if(ts.isEvaluated) {
                        this.tests.push(t);
                        break;
                    }
    }

    setTest(test: Test) {
        if(this.testsData[test.id] != undefined) {
            this.data = this.testsData[test.id].data;
        }
        else {
            this.addTest(test);
            this.data = this.testsData[test.id].data;
        }
        this.currTestId = test.id;
    }

    private addTest(test: Test) {
        this.testsData[test.id] = {data: []};
        for (let ts of test.testSolutions) {
            if (ts.isEvaluated) {
                this.addSolution(ts, test.id);
            }
        }
    }

    private addSolution(ts, testId: number) {
        let testQuestionsAverageScore = 0;
        for (let tsq of ts.testSolutionQuestions)
            if (tsq.score != 0)
                testQuestionsAverageScore += tsq.score;
        testQuestionsAverageScore /= ts.testSolutionQuestions.length;

        // check if this candidate already exists in the diagram
        let indexOfCandidate = this.testsData[testId].data.findIndex(obj => obj.name === ts.fullName);
        if(indexOfCandidate === -1) {
            this.testsData[testId].data.push({
                "name": ts.fullName,
                "value": testQuestionsAverageScore
            })
        }
        else {
            this.testsData[testId].data[indexOfCandidate].value = testQuestionsAverageScore;
        }
    }

    private updateDataOnNewFeedback(testSolution: TestSolution) {
        if (-1 === this.tests.findIndex(t => t.id === testSolution.testId)) {
            // this is the first solution of this test and we don't have it in our tests array
            let newTest = this.position.tests.find(t => t.id === testSolution.testId);
            this.tests.push(newTest);
            this.addTest(newTest);
        }
        else {
            // just add the solution to the test
            this.addSolution(testSolution, testSolution.testId);
            // if the solution was for the current test we want to see it in the diagram
            if (this.currTestId === testSolution.testId)
                this.data = this.testsData[testSolution.testId].data;
        }
    }

    getCurrTest() {
        return this.tests.find(t => t.id === this.currTestId);
    }

    getSolvedTime(candidate: string) {
        return this.getCurrTest().testSolutions.find(ts => ts.fullName === candidate).timeInSeconds;
    }
}
