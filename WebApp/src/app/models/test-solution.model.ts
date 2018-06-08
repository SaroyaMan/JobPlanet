import {TestSolutionQuestion} from './test-solution-question.model';
import {Test} from './test.model';

export class TestSolution {

    public test:Test = null;
    public isMember:boolean;
    public candidateUserId:number;
    public dateCreated:string;

    constructor(public id:number,
                public testId:number,
                public fullName:string,
                public email:string,
                public timeInSeconds:number,
                public testSolutionQuestions:TestSolutionQuestion[],
                public isEvaluated:boolean = false) {}
}