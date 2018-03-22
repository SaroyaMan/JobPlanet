
export class SearchQuestionsQuery {
    constructor(public title:string,
                public skillIds:number[],
                public minRank:number,
                public maxRank:number) {}
}