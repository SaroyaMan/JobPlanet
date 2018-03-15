import { Component, OnInit } from '@angular/core';
import {WebApiService} from '../../shared/web-api.service';
import {Skill} from '../../models/Skill';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

    searchQuestionsForm:FormGroup;
    skills = [];
    selectedItems = [];
    settings = {};

    constructor(private webApiService:WebApiService) {
    }

    ngOnInit() {

        this.webApiService.getSkills()
            .subscribe(
                (skills:Skill[]) => {
                    this.skills = skills;
                    // for(let skill of this.skills) {
                    //     (<any>skill)["itemName"] = skill.name;
                    // }
                }
            );

        this.searchQuestionsForm = new FormGroup({
            skills: new FormControl([], Validators.required),
        });


        // setTimeout(() => {
        //     this.searchQuestionsForm = new FormGroup({
        //         skills: new FormControl([], Validators.required),
        //     });
        // }, 10000);


        this.selectedItems = [];
        // this.settings = {
        //     text: "Select Skills",
        //     searchPlaceholderText: "Search Skill",
        //     enableSearchFilter: true,
        //     searchAutofocus: true,
        //     enableCheckAll: false,
        //     // selectAllText: 'Select All',
        //     // unSelectAllText: 'UnSelect All',
        //     // classes: "myclass custom-class"
        // };
    }


    onItemSelect(skill:any) {
        console.log(skill);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(skill:any) {
        console.log(skill);
        console.log(this.selectedItems);
    }

}