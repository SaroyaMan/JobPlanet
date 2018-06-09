import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {WebApiService} from '../../shared/web-api.service';
import {Question} from '../../models/question.model';
import {AccessModifier, RefObjectType} from '../../shared/enums';
import {Consts} from '../../shared/consts';
import {AuthService} from '../../auth/auth.service';
import {UserType} from '../../auth/models/user-type.enum';
import {FileUploaderComponent} from '../../shared/file-uploader/file-uploader.component';
import {CustomDialogComponent} from '../../utils/custom-dialog/custom-dialog.component';
import {ModalDialogService} from 'ngx-modal-dialog';

@Component({
    selector: 'app-publish-question-form',
    templateUrl: './publish-question-form.component.html',
    styleUrls: ['./publish-question-form.component.css']
})
export class PublishQuestionFormComponent implements OnInit {

    @ViewChild(FileUploaderComponent) fileUploader: FileUploaderComponent;
    @Output() onQuestionPublished: EventEmitter<Question> = new EventEmitter();
    @Input() skills = [];
    publishQuestionForm: FormGroup;
    selectedItems = [];
    dropdownSettings = {};


    oneTimeIf = true;

    constructor(private webApiService: WebApiService,
                private authService: AuthService,
                private toaster: ToastsManager,
                private modalDialogService:ModalDialogService,
                private viewContainer: ViewContainerRef) {}

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

        this.modalDialogService.openDialog(this.viewContainer, {
            title: `Publish Question`,
            childComponent: CustomDialogComponent,
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            data: 'Are you sure you want publish the question?',
            actionButtons: [
                {
                    text: 'Publish',
                    buttonClass: 'btn btn-success',
                    onAction: () => this.publishQuestion(),
                },
                {
                    text: 'Cancel',
                    buttonClass: 'btn btn-outline-danger',
                    onAction: () => true,
                }
            ]
        });
    }

    publishQuestion() {
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

        this.webApiService.publishQuestion(question, this.fileUploader.fileToUpload == null)
            .subscribe(
                (updatedQuestion:Question) => {
                    if(updatedQuestion) {
                        if (this.fileUploader.fileToUpload != null) {
                            this.fileUploader.uploadFile(RefObjectType.Question, updatedQuestion.id, () => {
                                this.publishQuestionDone(updatedQuestion);
                            });
                        }
                        else {
                            this.publishQuestionDone(updatedQuestion);
                        }
                    }
                    else {
                        this.toaster.error('Publish Question Failed!', 'Error');
                        this.publishQuestionForm.reset();
                        this.fileUploader.fileToUpload = null;
                    }
                }
            );

        
        return true;
    }

    publishQuestionDone(question: Question) {

        this.toaster.success('Question was successfully published!', 'Success!');
        this.onQuestionPublished.emit(question);
        this.publishQuestionForm.reset();
        this.fileUploader.fileToUpload = null;
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
