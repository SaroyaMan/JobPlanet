import {CandidateQuestion} from '../models/candidate-question.model';
import {Question} from '../models/question.model';

export class CandidateDashboardData {

    questions:Question[] = [];
    publishedQuestionsDiagramData = [];

    constructor(public numOfQuestions:number,
                public todoListQuestions:CandidateQuestion[],
                public publishedQuestions:Question[]) {}
}