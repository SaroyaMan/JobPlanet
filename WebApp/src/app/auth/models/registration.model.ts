
export interface Registration {

    email:string;
    password:string;
    firstName:string;
    lastName:string;
}

export class RegistrationCandidate implements Registration {

    constructor(public email:string,
                public password:string,
                public firstName:string,
                public lastName:string,) {}
}

export class RegistrationRecruiter implements Registration {

    constructor(public email:string,
                public password:string,
                public firstName:string,
                public lastName:string,) {}
}