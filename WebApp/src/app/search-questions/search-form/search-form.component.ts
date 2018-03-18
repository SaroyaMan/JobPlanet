import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {WebApiService} from '../../shared/web-api.service';
import {Skill} from '../../models/Skill';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SkillCategory} from '../../models/skill-category.model';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

    @Input() skills = [];
    searchQuestionsForm:FormGroup;
    selectedItems = [];
    dropdownSettings = {};

    constructor(private webApiService:WebApiService) {
    }

    ngOnInit() {


        this.searchQuestionsForm = new FormGroup({
            skills: new FormControl([], Validators.required),
        });

        this.dropdownSettings = {
            singleSelection: false,
            text:"Select Skills",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            searchPlaceholderText: 'Search Skills',
            classes:"myclass custom-class",
            enableCheckAll: false,
            groupBy: "category",
        };
    }

    onItemSelect(item:any){
        console.log(this.searchQuestionsForm);
    }
    OnItemDeSelect(item:any){
    }


    onDeSelectAll(items: any){
    }
}