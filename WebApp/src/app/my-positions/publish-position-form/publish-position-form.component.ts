import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Consts} from '../../shared/consts';
import {ToastsManager} from 'ng2-toastr';
import {AuthService} from '../../auth/auth.service';
import {WebApiService} from '../../shared/web-api.service';
import {Position} from '../../models/position.model';
import {PositionStatus} from '../../shared/enums';
import {OnClickEvent} from 'angular-star-rating';
import {PositionSkill} from '../../models/position-skill.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-publish-position-form',
  templateUrl: './publish-position-form.component.html',
  styleUrls: ['./publish-position-form.component.css']
})
export class PublishPositionFormComponent implements OnInit {

    @Output() onPositionPublished: EventEmitter<Position> = new EventEmitter();
    @Input() skills = [];
    positionSkills: PositionSkill[] = [];
    weightSum:number = 0;
    publishPositionForm: FormGroup;
    selectedItems = [];
    dropdownSettings = {};

    ckEditorContent:string;
    ckEditorConfig = {
        uiColor: '#C0C0C0',
        removePlugins: 'forms,insert,about',
        extraPlugins: 'divarea',
        resize_enabled: false,
        height: '40vh',
        removeButtons: 'Iframe,Image,Flash,About,Save'
    };

    constructor(private webApiService: WebApiService,
                private authService: AuthService,
                private toaster: ToastsManager,) {}

    ngOnInit() {
        this.publishPositionForm = new FormGroup({
            title: new FormControl('', Validators.required),
            desc: new FormControl('', Validators.required),
            skills: new FormControl([], Validators.required),
            positionSkills: new FormControl([], null),
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

    onCreatePositionClicked() {
        const values = this.publishPositionForm.value;

        const skillIds = [];
        for (const skill of values.skills) {
            skillIds.push(skill.id);
        }

        let position  = new Position(
            0, values.title, values.desc, PositionStatus.Opened, null,
            null, null, null, skillIds.join(',')
        );

        position.positionSkills = this.positionSkills;

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
        this.weightSum = 0;
        this.positionSkills = [];
    }

    onItemSelect(item:any){
        this.positionSkills.push(new PositionSkill(0, item.id, 1));
        this.weightSum++;
        this.validateWeight();
    }

    OnItemDeSelect(item:any){
        this.weightSum -= this.positionSkills.find(ps => ps.skillId === item.id).skillWeight;
        this.positionSkills = this.positionSkills.filter(ps => ps.skillId !== item.id);
        this.validateWeight();
    }

    onWeightChange($event: OnClickEvent) {
        let weight = $event['event'].rating;
        let index = this.positionSkills.findIndex(ps => ps.skillId === $event['skill'].id);

        this.weightSum += (weight - this.positionSkills[index].skillWeight);
        this.positionSkills[index].skillWeight = weight;
        this.validateWeight();
    }

    private validateWeight() {
        if (this.weightSum !== 10) {
            this.publishPositionForm.controls['positionSkills'].setErrors({'weightInvalid': true});
        }
        else {
            this.publishPositionForm.controls['positionSkills'].setErrors(null);
        }
    }
}