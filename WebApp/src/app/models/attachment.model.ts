export class Attachment {

    constructor(public id:number = null,
                public fileName:string = null,
                public fileContent:any = null,
                public fileType:string = null,
                public refObjectType:number = null,
                public refObjectId:number = null,
                public dateCreated:string = null,
                public lastUpdateDate:string = null) {}
}