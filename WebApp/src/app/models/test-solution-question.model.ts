import {Question} from './question.model';
import {TestSolution} from './test-solution.model';

export class TestSolutionQuestion {

    testSolutionId:number;
    question: Question;

    constructor(public id:number,
                public questionId:number,
                public solution:string,
                public feedback:string = null,
                public score: number = 0) {}
}