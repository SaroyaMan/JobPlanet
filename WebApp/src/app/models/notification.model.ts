
export class Notification {

    constructor(public notificationId:number,
                public type:number,
                public dateCreated:string,
                public isViewed:boolean,
                public candidateId:number,
                public approved:boolean) {}
}