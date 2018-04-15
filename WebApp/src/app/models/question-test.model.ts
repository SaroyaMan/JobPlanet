import {Question} from './question.model';
import {Test} from './test.model';

export class QuestionTest {
    constructor(
        public id: number,
        public questionId: number,
        public testId: number,
        public question: Question,
        public test: Test,
    ) {};
}