import {Skill} from './skill.model';
import {PositionStatus} from '../shared/enums';
import {CandidatePosition} from './candidate-position.model';
import {PositionSkill} from './position-skill.model';

export class Position {

    public skills:Skill[] = [];
    public positionSkills: PositionSkill[] = [];
    public potentialCandidates: CandidatePosition[] = [];
    public tests = [];

    constructor(public id:number,
                public title:string,
                public description:string,
                public status:PositionStatus,
                public dateCreated:string,
                public createdByDisplayName:string,
                public lastUpdateDate:string,
                public lastUpdateByDisplayName:string,
                public requiredSkills:string,
    ) {}
}