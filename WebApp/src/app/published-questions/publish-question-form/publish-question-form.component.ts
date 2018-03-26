import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {WebApiService} from '../../shared/web-api.service';
import {Question} from '../../models/question.model';
import {AccessModifier, RefObjectType} from '../../shared/enums';
import {Consts} from '../../shared/consts';
import {FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

@Component({
    selector: 'app-publish-question-form',
    templateUrl: './publish-question-form.component.html',
    styleUrls: ['./publish-question-form.component.css']
})
export class PublishQuestionFormComponent implements OnInit {

    @Output() onQuestionPublished: EventEmitter<any> = new EventEmitter();
    @Input() skills = [];
    publishQuestionForm: FormGroup;
    selectedItems = [];
    dropdownSettings = {};

    fileToUpload:File = null;

    constructor(private webApiService: WebApiService,
                public toaster: ToastsManager) {}

    ngOnInit() {
        this.publishQuestionForm = new FormGroup({
            title: new FormControl('', Validators.required),
            desc: new FormControl('', Validators.required),
            skills: new FormControl([], Validators.required),
        });

        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Skills',
            enableSearchFilter: true,
            searchPlaceholderText: 'Search Skills',
            classes: 'myclass custom-class',
            enableCheckAll: false,
            searchAutofocus: true,
            groupBy: 'category',
            limitSelection: Consts.MAX_SKILLS_ALLOWED,
        };
    }

    onPublishQuestion() {
        const values = this.publishQuestionForm.value;

        const skillIds = [];
        for (const skill of values.skills) {
            skillIds.push(skill.id);
        }

        let question  = new Question(
            0, values.title, values.desc,
            null, '',
            null, '', 0,
            0, AccessModifier.Public, 0, skillIds.join(',')
        );

        this.webApiService.publishQuestion(question)
            .subscribe(
                (updatedQuestion:Question) => {
                    if(this.fileToUpload != null) {
                        this.webApiService.saveAttachment(this.fileToUpload, RefObjectType.Question, updatedQuestion.id)
                            .subscribe(
                                () => {
                                    this.publishQuestionDone();
                                }
                            );
                    }
                    else {
                        this.publishQuestionDone();
                    }

                }
            );
    }

    onDroppedFile(event:UploadEvent) {
        console.log(event);
        if(this.fileToUpload != null) {
            this.toaster.error("Cannot upload more than one file");
        }
        else if(event.files.length > 0) {
            let droppedFile = event.files[0];
            if (droppedFile.fileEntry.isFile) { // Is it a file?
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    this.fileToUpload = file;
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

    publishQuestionDone() {
        this.toaster.success('Question was successfully published!', 'Success!');
        this.onQuestionPublished.emit();
        this.publishQuestionForm.reset();
    }

    // createAttachment(file) {
    //     new Promise(
    //         (resolve, reject) => {
    //             // Convert the file to Base64
    //             let reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = function () {
    //                 resolve(reader.result);
    //             };
    //             reader.onerror = function (error) {
    //                 reject(error);
    //             };
    //         }
    //     ).then(res => {
    //         // this.fileContent = res;
    //         this.attachment = new Attachment(0, file.name, res, file.type, RefObjectType.Question, 0);
    //         console.log(this.attachment);
    //     });
    // }
    removeFile() {
        this.fileToUpload = null;
    }
}
