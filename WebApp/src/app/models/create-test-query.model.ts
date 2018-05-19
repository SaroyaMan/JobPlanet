export class CreateTestQuery {
    constructor(public skillIds: number[],
                public difficultyLevel: number,
                public timeFrame: number,
    ) {}
}