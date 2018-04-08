import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {WebApiService} from '../../shared/web-api.service';
import {Question} from '../../models/question.model';
import {AccessModifier, RefObjectType} from '../../shared/enums';
import {Consts} from '../../shared/consts';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';
import {HttpEventType} from '@angular/common/http';
import {BlockUiService} from '../../utils/block-ui/block-ui.service';
import {AuthService} from '../../auth/auth.service';
import {UserType} from '../../auth/models/user-type.enum';

@Component({
    selector: 'app-publish-question-form',
    templateUrl: './publish-question-form.component.html',
    styleUrls: ['./publish-question-form.component.css']
})
export class PublishQuestionFormComponent implements OnInit {

    @Output() onQuestionPublished: EventEmitter<Question> = new EventEmitter();
    @Input() skills = [];
    publishQuestionForm: FormGroup;
    selectedItems = [];
    dropdownSettings = {};

    fileToUpload:File = null;

    oneTimeIf = true;

    constructor(private webApiService: WebApiService,
                private authService: AuthService,
                private toaster: ToastsManager,
                private blockUiService:BlockUiService) {}

    ngOnInit() {
        this.publishQuestionForm = new FormGroup({
            title: new FormControl('', Validators.required),
            desc: new FormControl('', Validators.required),
            skills: new FormControl([], Validators.required),
            accessModifier: new FormControl('', Validators.required),
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

        const accessModifier = values.accessModifier ? values.accessModifier : AccessModifier.Public;

        let question  = new Question(
            0, values.title, values.desc,
            null, '',
            null, '', 0,
            0, accessModifier, 0, skillIds.join(',')
        );

        this.webApiService.publishQuestion(question, this.fileToUpload == null)
            .subscribe(
                (updatedQuestion:Question) => {
                    if(this.fileToUpload != null) {
                        this.webApiService.saveAttachment(this.fileToUpload, RefObjectType.Question, updatedQuestion.id)
                            .subscribe(
                                (event) => {
                                    if(event.type === HttpEventType.UploadProgress) {
                                        console.log("Upload Progress: " + Math.round(Math.round(100 * event.loaded / event.total)) + "%");
                                    }

                                    else if(event.type === HttpEventType.Response) {
                                        this.blockUiService.stop();
                                        this.publishQuestionDone(updatedQuestion);
                                    }
                                }
                            );
                    }
                    else {
                        this.publishQuestionDone(updatedQuestion);
                    }

                }
            );
    }

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

    publishQuestionDone(question: Question) {
        this.toaster.success('Question was successfully published!', 'Success!');
        this.onQuestionPublished.emit(question);
        this.publishQuestionForm.reset();
        this.removeFile();
    }

    removeFile() {
        this.fileToUpload = null;
    }

    removeRecruiterControls() {
        if(this.oneTimeIf && !this.isRecruiter()){
            this.publishQuestionForm.removeControl('accessModifier');
        }
        this.oneTimeIf = false;
    }

    isRecruiter() {
        return this.authService.UserType === UserType.Recruiter;
    }
}
