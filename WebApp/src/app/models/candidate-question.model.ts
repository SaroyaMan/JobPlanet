import {Question} from './question.model';

export class CandidateQuestion {

    constructor(public candidateUserId:number,
                public questionId:number,
                public isDone:boolean,
                public question:Question,
                public solution:string,
                public ranked:number,
                public solutionDate:string,
                public review:string) {}
}