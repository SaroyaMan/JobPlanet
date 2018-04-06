import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Consts} from '../../shared/consts';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from '../../auth/auth.service';
import {WebApiService} from '../../shared/web-api.service';
import {Position} from '../../models/position.model';
import {PositionStatus} from '../../shared/enums';

@Component({
  selector: 'app-publish-position-form',
  templateUrl: './publish-position-form.component.html',
  styleUrls: ['./publish-position-form.component.css']
})
export class PublishPositionFormComponent implements OnInit {

    @Output() onPositionPublished: EventEmitter<Position> = new EventEmitter();
    @Input() skills = [];
    publishPositionForm: FormGroup;
    selectedItems = [];
    dropdownSettings = {};

    constructor(private webApiService: WebApiService,
                private authService: AuthService,
                private toaster: ToastsManager,) {}

    ngOnInit() {
        this.publishPositionForm = new FormGroup({
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

    onPublishPositionClicked() {
        const values = this.publishPositionForm.value;

        const skillIds = [];
        for (const skill of values.skills) {
            skillIds.push(skill.id);
        }

        let position  = new Position(
            0, values.title, values.desc, PositionStatus.Opened, null,
            null, null, null, skillIds.join(',')
        );

        this.publishPosition(position);
    }

    private publishPosition(position: Position) {
        this.webApiService.publishPosition(position)
            .subscribe(
                (position: Position) => {
                    this.publishPositionDone(position);
                }
            );
    }

    private publishPositionDone(position: Position) {
        this.toaster.success('Position was successfully published!', 'Success!');
        this.onPositionPublished.emit(position);
        this.publishPositionForm.reset();
    }
}
