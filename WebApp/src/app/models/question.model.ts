import {Skill} from './skill.model';
import {QuestionState} from '../shared/enums';

export class Question {

    public skills:Skill[] = [];

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
    ) {}
}