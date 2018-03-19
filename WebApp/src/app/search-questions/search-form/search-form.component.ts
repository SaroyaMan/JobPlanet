import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

    constructor() {
    }

    ngOnInit() {


        this.searchQuestionsForm = new FormGroup({
            name: new FormControl(""),
            skills: new FormControl([]),
            rank: new FormControl(""),

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
            searchAutofocus: true,
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