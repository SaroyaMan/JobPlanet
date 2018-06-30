import {Component, OnInit} from '@angular/core';
import {SkillCategory} from '../models/skill-category.model';
import {WebApiService} from '../shared/web-api.service';
import {Question} from '../models/question.model';
import {QuestionState} from '../shared/enums';
import {AuthService} from '../auth/auth.service';
import {UserType} from '../auth/models/user-type.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {ParsedSkills} from '../models/skill.model';

@Component({
    selector: 'app-published-questions',
    templateUrl: './published-questions.component.html',
    styleUrls: ['./published-questions.component.css']
})
export class PublishedQuestionsComponent implements OnInit {

    constructor(private webApiService:WebApiService,
                private authService:AuthService,
                private activatedRoute:ActivatedRoute,
                private router:Router) {
    }

    tabType:string = null;
    tabOptions = ['my-published-questions', 'publish-question'];

    listType = '1';
    skills = [];
    publishedQuestions: Question[] = null;
    sortStrategy = null;
    orderStrategy: boolean = false;
    QuestionState = QuestionState;

    ngOnInit() {

        this.tabType = this.activatedRoute.snapshot.params['type'];
        if(this.tabOptions.includes(this.tabType) == false)
            this.goToDefaultPage();
        this.activatedRoute.params.subscribe(params => {
            this.tabType = this.activatedRoute.snapshot.params['type'];
            if(this.tabOptions.includes(this.tabType) == false)
                this.goToDefaultPage();
        });

        this.webApiService.getPublishedQuestions()
            .subscribe(
                (res) => {
                    this.publishedQuestions = res;
                }
            );

        this.webApiService.getCategoriesSkills()
            .subscribe(
                (skillsObj:ParsedSkills) => {
                    this.skills = skillsObj.skillsForMultiSelect;
                }
            );
    }

    pushPublishedQuestion(question: Question) {
        this.publishedQuestions.push(question);
    }

    isRecruiter() {
        return this.authService.UserType === UserType.Recruiter;
    }

    private goToDefaultPage() {
        this.router.navigate([`../${this.tabOptions[0]}`], {relativeTo: this.activatedRoute});
    }
}
