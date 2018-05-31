import {Skill} from './skill.model';

export class PositionSkill {

    skill: Skill;

    constructor(public positionId,
                public skillId,
                public skillWeight
    ) {}
}