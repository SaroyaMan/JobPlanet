import {Component, Input, OnInit} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {Test} from '../../../../models/test.model';
import {Position} from '../../../../models/position.model';
import {PositionDetailService} from '../position-detail.service';
import {TestSolution} from '../../../../models/test-solution.model';
import {PositionDiagramType} from '../../../enums';
import {Consts} from '../../../consts';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    @Input() position: Position;

    tests: Test[] = [];
    candidates:any[] = [];

    currTestId:number = -1;
    currCandidateEmail:string = null;

    currentData: any[] = [];
    currentDiagram:PositionDiagramType = PositionDiagramType.TestScore;

    PositionDiagramType = PositionDiagramType;

    testsData:any = {};
    skillsData:any = {};
    matchingData:any = {};

    skillsDictionaryById:any = {};

    candidateSkillsFullData = {};

    constructor(private positionDetailService: PositionDetailService,) {}

    ngOnInit() {

        this.skillsDictionaryById = this.position.skills.reduce((obj, item) => {
            obj[item.id] = item;
            return obj;
        }, {});


        // adding tests that have solutions and at least one solution is evaluated
        this.initTests();

        this.initDataForSkillDistributionDiagram();

        console.log(this.candidateSkillsFullData);

        if(this.tests && this.tests[0])
            this.setTest(this.tests[0].id);

        if(this.candidates && this.candidates[0]) {
            this.setCandidate(this.candidates[0].email);
        }



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

    setTest(testId:number) {
        if(this.testsData[testId] != undefined) {
            this.currentData = this.testsData[testId];
        }
        else {
            let test = this.tests.find(t => t.id === testId);
            if(test != null) {
                this.addTest(test);
                this.currentData = this.testsData[testId];
            }

        }
        this.currTestId = testId;
    }

    setCandidate(email:string) {

        this.currCandidateEmail = email;

        if(this.skillsData[this.currCandidateEmail] == null) {

            let testDistributionDataForSpeificCandidate = [];

            let candidateSkillsData = this.candidateSkillsFullData[this.currCandidateEmail];
            for(let skillIdKey of Object.keys(candidateSkillsData.skillsSum)) {
                testDistributionDataForSpeificCandidate.push({
                    name: this.skillsDictionaryById[skillIdKey].name,
                    value: candidateSkillsData.skillsSum[skillIdKey].avgScore,
                });
            }

            this.skillsData[this.currCandidateEmail] = testDistributionDataForSpeificCandidate;
        }

        if(this.matchingData[this.currCandidateEmail] == null) {

            let matchingDataForSpecificCandidate = [];

            matchingDataForSpecificCandidate.push({
                name: '',
                value: this.candidateSkillsFullData[this.currCandidateEmail].matchingPercentage
            });

            this.matchingData[this.currCandidateEmail] = matchingDataForSpecificCandidate;
        }

        if(this.currentDiagram === PositionDiagramType.SkillsDistribution) {
            this.currentData = this.skillsData[this.currCandidateEmail];
        }
        else {
            this.currentData = this.matchingData[this.currCandidateEmail];
        }

    }

    // setCandidateForBestMatch(email:string) {
    //
    //     this.currCandidateEmail = email;
    //
    //     if(this.matchingData[this.currCandidateEmail] == null) {
    //
    //         let matchingDataForSpecificCandidate = [];
    //
    //         matchingDataForSpecificCandidate.push({
    //            name: '',
    //            value: this.candidateSkillsFullData[this.currCandidateEmail].matchingPercentage
    //         });
    //
    //         this.matchingData[this.currCandidateEmail] = matchingDataForSpecificCandidate;
    //     }
    //
    //     this.currentData = this.matchingData[this.currCandidateEmail];
    // }


    private addTest(test: Test) {
        this.testsData[test.id] = [];
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
        let indexOfCandidate = this.testsData[testId].findIndex(obj => obj.name === ts.fullName);
        if(indexOfCandidate === -1) {
            this.testsData[testId].push({
                "name": ts.fullName,
                "value": testQuestionsAverageScore
            })
        }
        else {
            this.testsData[testId][indexOfCandidate].value = testQuestionsAverageScore;
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
                this.currentData = this.testsData[testSolution.testId];
        }
    }

    getCurrTest() {
        return this.tests.find(t => t.id === this.currTestId);
    }

    getSolvedTime(candidate: string) {
        let test = this.getCurrTest().testSolutions.find(ts => ts.fullName === candidate);
        return (test && test.timeInSeconds) || 0;
    }

    onSwitchDiagram(diagramType:PositionDiagramType) {
        this.currentDiagram = diagramType;

        switch(diagramType) {
            case PositionDiagramType.TestScore:
                if(this.tests && (this.tests[0] || this.currTestId)) {
                    let selectedTestId = this.currTestId || this.tests[0].id;
                    this.setTest(selectedTestId);
                }
                break;

            case PositionDiagramType.SkillsDistribution:
            case PositionDiagramType.PositionMatch:
                if(this.candidates && (this.candidates[0] || this.currCandidateEmail)) {
                    let selectedEmail = this.currCandidateEmail || this.candidates[0].email;
                    this.setCandidate(selectedEmail);
                }
                break;
        }
    }

    private initDataForSkillDistributionDiagram() {
        let skillsPosition = this.position.requiredSkills.split(',');
        for(let t of this.tests) {

            for(let ts of t.testSolutions) {

                if(ts.isEvaluated) {
                    for(let tsq of ts.testSolutionQuestions) {

                        if(this.candidateSkillsFullData[ts.email] == null) {
                            this.candidateSkillsFullData[ts.email] = {
                                email: ts.email,
                                fullName: ts.fullName,
                                skillsScore: {},
                                skillsSum: {},
                                matchingPercentage: 0,
                            };
                        }

                        if(t.questionTests) {

                            let relevantQuestion = t.questionTests.find(q => q.questionId === tsq.questionId);
                            if(relevantQuestion && relevantQuestion.question) {
                                let testedSkillIds = relevantQuestion.question.testedSkills.split(',');
                                for(let skillId of testedSkillIds) {
                                    if(skillsPosition.find(sp => sp === skillId) != null) {
                                        if(this.candidateSkillsFullData[ts.email].skillsScore[skillId] == null) {
                                            this.candidateSkillsFullData[ts.email].skillsScore[skillId] = [];
                                        }
                                        this.candidateSkillsFullData[ts.email].skillsScore[skillId].push(
                                            {
                                                'skillId': skillId,
                                                'score': tsq.score,
                                            }
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        for (let emailKey of Object.keys(this.candidateSkillsFullData)) {

            this.candidates.push({
                email: emailKey,
                fullName:  this.candidateSkillsFullData[emailKey].fullName,
            });

            let totalAvgScore = 0;

            for(let skillKey of Object.keys(this.candidateSkillsFullData[emailKey].skillsScore)) {
                let skillOfCandidates = this.candidateSkillsFullData[emailKey].skillsScore[skillKey];
                let sumScore = 0;
                for(let s of skillOfCandidates) {
                    sumScore += s.score;
                }
                if(this.candidateSkillsFullData[emailKey].skillsSum == null) {
                    this.candidateSkillsFullData[emailKey].skillsSum = {};
                }

                if(this.candidateSkillsFullData[emailKey].skillsSum[skillKey] == null) {
                    this.candidateSkillsFullData[emailKey].skillsSum[skillKey] = {
                        avgScore: 0,
                        totalScore: 0,
                    };
                }

                this.candidateSkillsFullData[emailKey].skillsSum[skillKey].avgScore = sumScore / skillOfCandidates.length;
                this.candidateSkillsFullData[emailKey].skillsSum[skillKey].totalScore = sumScore / (skillOfCandidates.length * Consts.MAX_RANKING_FEEDBACK);

                totalAvgScore += this.candidateSkillsFullData[emailKey].skillsSum[skillKey].avgScore;
            }

            this.candidateSkillsFullData[emailKey].matchingPercentage = (totalAvgScore / (Consts.MAX_RANKING_FEEDBACK * this.position.skills.length) * 100);

        }
    }
}
