import {Skill} from './skill.model';

export class SkillCategory {
    constructor(public id:number,
                public name:string,
                public skills:Skill[]) {}
}