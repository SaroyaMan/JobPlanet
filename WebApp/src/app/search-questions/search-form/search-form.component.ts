import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchQuestionsQuery} from '../../models/search-questions-query.model';
import {WebApiService} from '../../shared/web-api.service';
import {Question} from '../../models/question.model';
import {OnClickEvent} from 'angular-star-rating';
import {Observable} from 'rxjs/Observable';

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

    oldMinRate = -1;
    oldMaxRate = -1;

    constructor(private webApiService:WebApiService) {
    }

    ngOnInit() {


        this.searchQuestionsForm = new FormGroup({
            title: new FormControl(""),
            skills: new FormControl([]),
            minRank: new FormControl("", null, [this.validateRanks.bind(this)]),
            maxRank: new FormControl("", null, [this.validateRanks.bind(this)]),

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

        let values = group.value;

        if(values.title.length || values.skills.length || +(values.minRank) > 0 || +(values.maxRank) > 0) {
            return null;
        }
        return {'atLeastOneValidator': true};
    }

    onSearchQuestions() {
        // this.searchQuestionsForm.value.minRank = null;

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

    onMinRatingChange($event:OnClickEvent) {
        if(this.oldMinRate === this.searchQuestionsForm.value.minRank) {
            this.searchQuestionsForm.patchValue({'minRank': ""});
            this.oldMinRate = -1;
        }
        else {
            this.oldMinRate = $event.rating;
        }
    }

    onMaxRatingChange($event:OnClickEvent) {
        if(this.oldMaxRate === this.searchQuestionsForm.value.maxRank) {
            this.searchQuestionsForm.patchValue({'maxRank': ""});
            this.oldMaxRate = -1;
        }
        else {
            this.oldMaxRate = $event.rating;
        }
    }

    validateRanks(control:FormControl): Promise<any> | Observable<any> {
        return new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    let values = this.searchQuestionsForm.value;
                    let minVal = values.minRank === "" ? 0 : values.minRank;
                    let maxVal = values.maxRank === "" ? 0 : values.maxRank;
                    if(maxVal !== 0 && minVal > maxVal) {
                        resolve({'rankInvalid': true});
                    }
                    else {
                        resolve(null);
                    }
                },500);
            }
        );
    }
}