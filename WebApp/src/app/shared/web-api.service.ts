import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BlockUiService} from '../utils/block-ui/block-ui.service';
import {ErrorHandlerService} from './error-handler.service';
import {Consts} from './consts';
import {SearchQuestionsQuery} from '../models/search-questions-query.model';
import {Skill} from '../models/skill.model';
import {Question} from '../models/question.model';

@Injectable()
export class WebApiService {

    skills:Skill[];

    constructor(private http: HttpClient,
                private blockUiService: BlockUiService,
                private errorHandlerService: ErrorHandlerService,
                private router:Router) {

        // Load skills
        this.getSkills().subscribe(res => this.skills = res);
    }


    /*
        **************************************************
        *********************Skills***********************
        **************************************************
     */
    getSkills() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.get(`${Consts.WEB_SERVICE_URL}/skills`)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Skills Failed');
            });
    }

    getCategoriesSkills() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.get(`${Consts.WEB_SERVICE_URL}/skills/getAllCategories`)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Skills Failed');
            });
    }


    /*
        **************************************************
        *********************Questions********************
        **************************************************
    */
    searchQuestions(searchQuery:SearchQuestionsQuery, loadSkills:boolean = false) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.post(`${Consts.WEB_SERVICE_URL}/questions/searchQuestions`, searchQuery)
            .map((questions:Question[]) => {
                // if(loadSkills) {
                    // this.loadSkillsForQuestions(questions);
                // }
                return questions;
            })
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Search Questions Failed');
            });
    }

    getPublishedQuestions(loadSkills:boolean = false) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.get(`${Consts.WEB_SERVICE_URL}/questions/publishedQuestions`)
            .map((questions:Question[]) => {
                // if(loadSkills) {
                //     console.log(questions);
                    // this.loadSkillsForQuestions(questions);
                // }
                return questions;
            })
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Getting Published Questions Failed');
            });
    }

    publishQuestion(question: Question, stopBlockUi = true) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.post(`${Consts.WEB_SERVICE_URL}/questions/publishQuestion`, question)
            .finally( () => { if(stopBlockUi) this.blockUiService.stop()} )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Getting Published Questions Failed');
            });
    }

    saveAttachment(file:File, refObjectType, refObjectId) {

        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        let formData:FormData = null;
        if(file != null) {
            formData = new FormData();
            formData.append('file',file);
        }
        return this.http.post(`${Consts.WEB_SERVICE_URL}/attachments/upload/${refObjectType}/${refObjectId}`
            , formData,
        {reportProgress: true, observe: 'events'}
        )
            .catch(error => {
                this.blockUiService.stop();
                return this.errorHandlerService.handleHttpRequest(error, 'Upload Attachment Failed');
            });

    }

    addQuestionToTodoList(questionId: number) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.post(`${Consts.WEB_SERVICE_URL}/questions/addToTodoList/${questionId.toString()}`, {})
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Failed to add the question');
            });
    }

    // Private methods
    // private loadSkillsForQuestions(questions:Question[]) {
    //     for (let q of questions) {
    //         q.skills = this.skills.filter((value: Skill, index: number) => {
    //             let ids = q.testedSkills.split(',').map(Number);
    //             for (let id of ids) {
    //                 if (id === value.id) return true;
    //             }
    //             return false;
    //         })
    //     }
    // }
}
