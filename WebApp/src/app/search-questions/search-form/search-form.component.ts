import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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

    oldRating = false;


    constructor() {
    }

    ngOnInit() {


        this.searchQuestionsForm = new FormGroup({
            name: new FormControl(""),
            skills: new FormControl([]),
            rank: new FormControl(0),

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
    //
    // onClickStar($event: OnClickEvent) {
    //     $event.rating = 0;
    //     if(this.oldRating === this.oldRating) {
    //         this.oldRating = true;
    //     }
    // }
    //
    // onRatingChange($event:OnRatingChangeEven) {
    //     this.oldRating = this.searchQuestionsForm.value.rank;
    //     console.log($event);
    //     console.log(this.searchQuestionsForm.value.rank);
    // }

    // validateSameRating(control:FormControl): Promise<any> | Observable<any> {
    //     return new Promise<any>(
    //         (resolve, reject) => {
    //             setTimeout(() => {
    //                 // console.log(this.oldRating);
    //                 if(control.value === this.oldRating) {
    //                     this.searchQuestionsForm.value.rank = 0;
    //                     resolve({'reset': true});
    //                 }
    //                 else {
    //                     resolve(null);
    //                 }
    //             },1500);
    //         }
    //     );
    // }
}