
export class Skill {

    constructor(public id:number,
                public name:string,
                public dateCreated:string,
                public createdByDisplayName:string,
                public lastUpdateDateByDisplayName:string,
                public lastUpdateDate:string) {}
}

export class SkillMultiSelect {

    constructor(public id:number,
                public name:string,
                public category:string) {}
}