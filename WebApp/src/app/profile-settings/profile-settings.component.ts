import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserType} from '../auth/models/user-type.enum';
import {FileUploaderComponent} from '../shared/file-uploader/file-uploader.component';
import {WebApiService} from '../shared/web-api.service';
import {RefObjectType} from '../shared/enums';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ProfileSettings} from '../models/profile-settings.model';
import {ToastsManager} from 'ng2-toastr';
import {Attachment} from '../models/attachment.model';
import {Patterns} from '../shared/patterns';
import {Consts} from '../shared/consts';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

    @ViewChild(FileUploaderComponent) fileUploader: FileUploaderComponent;

    updateDetailsForm: FormGroup;
    profileSettings: ProfileSettings = null;
    receiveNotifications: boolean = null;
    allowSendResume: boolean = null;

    formControlAllowSendResume:FormControl = null;

    resume:Attachment = new Attachment();
    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private activeModal:NgbActiveModal,
                private toaster:ToastsManager,
                private authService:AuthService,
                private webApiService:WebApiService,) { }

    ngOnInit() {
        let userData = this.authService.getUserData();
        this.profileSettings = new ProfileSettings(
            userData.firstName, userData.lastName, userData.allowSendResume, userData.receiveNotifications);
        this.allowSendResume = userData.allowSendResume;
        this.receiveNotifications = userData.receiveNotifications;

        if(this.isCandidate()) {
            this.webApiService.getAttachmentDetails(RefObjectType.Candidate)
                .subscribe ((res: Attachment) => {
                    if(res) {
                        this.resume.fileName = res.fileName;
                        this.resume.fileType = res.fileType;
                        this.resume.lastUpdateDate = res.lastUpdateDate;

                        if(this.formControlAllowSendResume && this.resume.fileName) {
                            this.formControlAllowSendResume.enable();
                        }

                        this.webApiService.getAttachmentContent(RefObjectType.Candidate)
                            .subscribe(
                                (event ) => {
                                    if (event.type === HttpEventType.DownloadProgress) {
                                    }
                                    else if (event instanceof HttpResponse && event.body.size > 0) {
                                        this.resume.fileContent = event.body;
                                    }
                                },
                                (error) => { console.log(error); }
                            );
                    }
                });

        }

        let fileFormControl = new FormControl("");

        this.updateDetailsForm = new FormGroup({
            'firstName': new FormControl("", Validators.pattern(Patterns.only_letters)),
            'lastName': new FormControl("", Validators.pattern(Patterns.only_letters)),
            'file': fileFormControl,
        }, this.atLeastOneValidator.bind(this));

        if(this.isCandidate()) {
            this.formControlAllowSendResume = new FormControl({value: userData.allowSendResume, disabled: !this.resume.fileName});
            this.updateDetailsForm.addControl('allowSendResume', this.formControlAllowSendResume);
        }
        else {
            let formControlCheckboxNotifications = new FormControl(userData.receiveNotifications);
            this.updateDetailsForm.addControl('receiveNotifications', formControlCheckboxNotifications);
        }
    }

    atLeastOneValidator(group: FormGroup): {[s:string]: boolean} {
        let values = group.value;
        if(values.firstName || values.lastName || values.file ||
            values.allowSendResume !== this.allowSendResume || values.receiveNotifications !== this.receiveNotifications) {
            return null;
        }
        return {'atLeastOneValidator': true};
    }

    quitModal() {
        this.activeModal.close();
    }

    onSaveDetails() {
        if(this.isCandidate() && this.fileUploader.fileToUpload != null) {
            this.resume.fileName = this.fileUploader.fileToUpload.name;
            this.fileUploader.uploadFile(RefObjectType.Candidate, null, () => {
                this.fileUploader.fileToUpload = null;
                if(this.updateDetailsForm.valid) {
                    this.updateProfile(false);
                }
                else{
                    this.saveDetailsDone();
                }
            });
        }
        else {
            this.updateProfile(true);
        }
    }

    updateProfile(blockUi: boolean) {
        let values = this.updateDetailsForm.value;

        if(values.firstName) this.profileSettings.firstName = values.firstName;
        if(values.lastName) this.profileSettings.lastName = values.lastName;
        this.profileSettings.allowSendResume = values.allowSendResume;
        this.profileSettings.receiveNotifications = values.receiveNotifications;

        this.webApiService.updateProfile(this.profileSettings, blockUi)
            .subscribe(() => {
                this.authService.setDetails(this.profileSettings);
                this.saveDetailsDone();
            });
    }

    saveDetailsDone() {
        this.toaster.success("Your details have been updated", "Success");
        this.updateDetailsForm.reset();
        this.quitModal();
    }

    isCandidate() {
        return this.authService.UserType === UserType.Candidate;
    }

    setFormValid(hasFile: boolean) {

        if(!this.resume.fileName) {
            if(hasFile) {
                this.formControlAllowSendResume.enable();
            }
            else {
                this.formControlAllowSendResume.disable();
            }
        }

        // A workaround to set the form valid as the fileUploader can't be accessed from custom validators (must be static)
        // so we set a value to a control which isn't visible.
        this.updateDetailsForm.controls['file'].setValue(hasFile ? 'a' : null);
    }
}
