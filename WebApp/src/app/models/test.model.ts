import {Skill} from './skill.model';
import {Position} from './position.model';
import {QuestionTest} from './question-test.model';

export class Test {

    public position: Position;
    public questionTests: QuestionTest[];

    constructor(
        public id: number,
        public title: string,
        public difficulty: number,
        public timeFrameInMinutes: number,
        public maxQuestions: number,
        public focusedSkills: string,
        public questions: string,
        public positionId: number,
        public dateCreated: string = null,
        public createdByDisplayName: string = null,
        public lastUpdateDate: string = null,
        public lastUpdateByDisplayName: string = null,
    ) {};
}