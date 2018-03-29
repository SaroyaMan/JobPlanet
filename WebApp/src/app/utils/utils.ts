
export class Utils {

    static blobToFile(blob:Blob):File {
        let b:any = blob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        // b.lastModifiedDate = new Date();
        b.name = "";

        //Cast to a File() type
        return <File> blob;
    }
}