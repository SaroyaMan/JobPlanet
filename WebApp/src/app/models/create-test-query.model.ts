export class CreateTestQuery {
    constructor(public numberOfTries: number,
                public skillIds: number[],
                public difficultyLevel: number,
                public timeFrame: number,
                public maxQuestions: number,
    ) {}
}