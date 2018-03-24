import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {WebApiService} from '../../shared/web-api.service';
import {Question} from '../../models/question.model';
import {AccessModifier} from '../../shared/enums';
import {Consts} from '../../shared/consts';

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
    fileToUpload: File = null;
    maxFileSize = 5 * 1024 * 1024;
    isFileTooBig = false;

    constructor(private webApiService: WebApiService,
                public toaster: ToastsManager) {}


    // handleFileInput(files: FileList) {
    //     if (files.item(0)) {
    //         this.fileToUpload = files.item(0);
    //         console.log(this.fileToUpload.size);
    //         if (this.fileToUpload.size > this.maxFileSize) {
    //             this.isFileTooBig = true;
    //         }
    //     }
    // }

    ngOnInit() {
        this.publishQuestionForm = new FormGroup({
            title: new FormControl('', Validators.required),
            desc: new FormControl('', Validators.required),
            skills: new FormControl([], Validators.required),
            // file: new FormControl('', Validators.required)
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
                (res) => {
                    if (res) {
                        this.toaster.success('Question was successfully published!', 'Success!');
                        this.onQuestionPublished.emit();
                        this.publishQuestionForm.reset();
                    }
                }
            );
    }

    onItemSelect(item: any) {}

    OnItemDeSelect(item: any) {}

    onDeSelectAll(items: any) {}
}
