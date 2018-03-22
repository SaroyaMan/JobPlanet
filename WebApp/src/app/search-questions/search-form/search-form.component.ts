import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchQuestionsQuery} from '../../models/search-questions-query.model';
import {WebApiService} from '../../shared/web-api.service';
import {Question} from '../../models/question.model';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

    @Input() skills = [];
    @Output() onLoadResults:EventEmitter<Question[]> = new EventEmitter<Question[]>();
    searchQuestionsForm:FormGroup;
    selectedItems = [];
    dropdownSettings = {};

    oldRating = false;


    constructor(private webApiService:WebApiService) {
    }

    ngOnInit() {


        this.searchQuestionsForm = new FormGroup({
            title: new FormControl(""),
            skills: new FormControl([]),
            minRank: new FormControl(""),
            maxRank: new FormControl(""),

        }, this.atLeastOneValidator.bind(this));


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

    atLeastOneValidator(group: FormGroup): {[s:string]: boolean} {

        console.log(this);
        let values = group.value;

        if(values.title.length || values.skills.length || +(values.minRank) > 0 || (+values.maxRank) > 0) {
            return null;
        }
        return {'atLeastOneValidator': true};
    }

    onSearchQuestions() {
        let values = this.searchQuestionsForm.value;
        let skillIds = [];
        for(let skill of values.skills) {
            skillIds.push(skill.id);
        }
        let searchQuery  = new SearchQuestionsQuery(values.title, skillIds, values.minRank, values.maxRank);

        this.webApiService.searchQuestions(searchQuery)
            .subscribe(
                (res) => {
                    console.log(res);
                    this.onLoadResults.emit(res);
                }
            );
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