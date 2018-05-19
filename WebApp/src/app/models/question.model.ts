import {Skill} from './skill.model';
import {QuestionState} from '../shared/enums';

export class Question {

    public skills:Skill[] = [];
    public isInTest: boolean;
    public isNotInTest: boolean;

    constructor(public id:number,
                public title:string,
                public description:string,
                public dateCreated:string,
                public createdByDisplayName:string,
                public lastUpdateDate:string,
                public lastUpdateByDisplayName:string,
                public rank:number,
                public rankedCount:number,
                public accessModifier:number,
                public solvedCount:number,
                public testedSkills:string,
                public questionState:QuestionState = null,
                public matchingDistance:number = null,
    ) {}
}

export class QuestionMultiSelect {

    constructor(public id:number,
                public name:string,
                public rank:string) {}
}