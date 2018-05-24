import {TestSolutionQuestion} from './test-solution-question.model';

export class TestSolution {

    public isMember:boolean;
    public candidateUserId:number;
    public dateCreated:string;

    constructor(public id:number,
                public testId:number,
                public fullName:string,
                public email:string,
                public timeInSeconds:number,
                public testSolutionQuestions:TestSolutionQuestion[]) {}
}