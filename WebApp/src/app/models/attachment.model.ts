
export class Attachment {

    constructor(public id:number,
                public fileName:string,
                public fileContent:any,
                public fileType:string,
                public refObjectType:number,
                public refObjectId:number) {}
}