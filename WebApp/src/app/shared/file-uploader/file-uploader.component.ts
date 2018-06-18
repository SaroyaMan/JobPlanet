import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';
import {ToastsManager} from 'ng2-toastr';
import {RefObjectType} from '../enums';
import {HttpEventType} from '@angular/common/http';
import {WebApiService} from '../web-api.service';
import {BlockUiService} from '../../utils/block-ui/block-ui.service';
import {Question} from '../../models/question.model';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit, AfterViewInit {

    @ViewChild('templateElement') template: ElementRef;

    @Output() onFileChanged: EventEmitter<boolean> = new EventEmitter();

    ngAfterViewInit() {
    }

    private _fileToUpload: File = null;

    get fileToUpload(): File { return this._fileToUpload; }

    set fileToUpload(value: File) {
        this.onFileChanged.emit(value != null);
        this._fileToUpload = value;
    }

    constructor(private toaster: ToastsManager,
                private blockUiService:BlockUiService,
                private webApiService: WebApiService,) { }

    ngOnInit() {}



    onDroppedFile(event:UploadEvent) {
        if(this.fileToUpload != null) {
            this.toaster.error("Cannot upload more than one file");
        }
        else if(event.files.length > 0) {
            let droppedFile = event.files[0];
            if (droppedFile.fileEntry.isFile) { // Is it a file?
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    this.fileToUpload = file;
                    // a workaround to show the dropped file
                    this.template.nativeElement.click();
                });
            }
        }
    }

    onClickUpload(files:FileList, fileInput:HTMLInputElement) {
        if(this.fileToUpload != null) {
            this.toaster.error("Cannot upload more than one file");
        }
        else {
            this.fileToUpload = files.item(0);
        }
        fileInput.value = null;
    }

    removeFile() {
        this.fileToUpload = null;
    }

    uploadFile(objectType: RefObjectType, id: number = null, callback: () => void = null) {
        this.webApiService.saveAttachment(this.fileToUpload, objectType, id)
            .subscribe(
                (event) => {
                    if(event.type === HttpEventType.UploadProgress) {
                        // console.log("Upload Progress: " + Math.round(Math.round(100 * event.loaded / event.total)) + "%");
                    }
                    else if(event.type === HttpEventType.Response) {
                        this.blockUiService.stop();
                        if(callback != null)
                            callback();
                    }
                }
            );
    }
}