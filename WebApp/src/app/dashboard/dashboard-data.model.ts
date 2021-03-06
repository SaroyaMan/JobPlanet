import {Question} from '../models/question.model';
import {Position} from '../models/position.model';

export class CandidateDashboardData {

    questions:Question[] = [];
    publishedQuestionsDiagramData = [];

    constructor(public numOfQuestions:number,
                public todoListQuestions:Question[],
                public publishedQuestions:Question[]) {}
}

export class RecruiterDashboardData {


    constructor(public openPositions:Position[],
                public numOfOpenPositions:number) {}
}