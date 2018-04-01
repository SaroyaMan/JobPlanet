import {Question} from './question.model';

export class CandidateQuestion {

    constructor(public candidateUserId:number,
                public questionId:number,
                public isDone:boolean,
                public question:Question,
                public answer:string) {}
}