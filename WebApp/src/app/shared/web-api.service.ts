import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BlockUiService} from '../utils/block-ui/block-ui.service';
import {ErrorHandlerService} from './error-handler.service';
import {Consts} from './consts';
import {SearchQuestionsQuery} from '../models/search-questions-query.model';
import {Question} from '../models/question.model';
import {Position} from '../models/position.model';
import {CreateTestQuery} from '../models/create-test-query.model';
import {Test} from '../models/test.model';
import {ProfileSettings} from '../models/profile-settings.model';
import {RefObjectType} from './enums';

@Injectable()
export class WebApiService {

    // skills:Skill[];

    constructor(private http: HttpClient,
                private blockUiService: BlockUiService,
                private errorHandlerService: ErrorHandlerService) {

        // Load skills
        // this.getSkills().subscribe(res => this.skills = res);
    }


    /*
        **************************************************
        *********************Skills***********************
        **************************************************
     */
    // getSkills() {
    //     this.blockUiService.start(Consts.BASIC_LOADING_MSG);
    //
    //     return this.http.get(`${Consts.WEB_SERVICE_URL}/skills`)
    //         .finally( () => this.blockUiService.stop() )
    //         .catch(error => {
    //             return this.errorHandlerService.handleHttpRequest(error, 'Skills Failed');
    //         });
    // }

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
    searchQuestions(searchQuery:SearchQuestionsQuery) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.post(`${Consts.WEB_SERVICE_URL}/questions/searchQuestions`, searchQuery)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Search Questions Failed');
            });
    }

    searchQuestionsForTest(searchQuery: CreateTestQuery) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.post(`${Consts.WEB_SERVICE_URL}/questions/SearchQuestionsForTest`, searchQuery)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Search Questions For Test Failed');
            });
    }

    getInternalQuestions() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.get(`${Consts.WEB_SERVICE_URL}/questions/internalQuestions`)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Getting Internal Questions Failed');
            });
    }

    getPublishedQuestions() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.get(`${Consts.WEB_SERVICE_URL}/questions/publishedQuestions`)
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
                return this.errorHandlerService.handleHttpRequest(error, 'Publish Question Failed');
            });
    }

    getMyQuestions(isDone: boolean) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.get(`${Consts.WEB_SERVICE_URL}/questions/myQuestions/${isDone.toString()}`)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Getting MyQuestions Failed');
            });
    }

    addQuestionToTodoList(questionId: number) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.post(`${Consts.WEB_SERVICE_URL}/questions/addToTodoList/${questionId.toString()}`, {})
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Add Question Failed');
            });
    }

    getCandidateQuestion(questionId:number) {

        return this.http.get(`${Consts.WEB_SERVICE_URL}/questions/candidateQuestion/${questionId.toString()}`, {})
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Get Candidate-Question Failed');
            });
    }

    postSolution(solutionData: { questionId: number; solution: string }) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.patch(`${Consts.WEB_SERVICE_URL}/questions/postSolution`, solutionData)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Publish Answer Failed');
            });
    }

    postReview(reviewData: { questionId: number; rank:number; review:string }) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.patch(`${Consts.WEB_SERVICE_URL}/questions/postReview`, reviewData)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Publish Review Failed');
            });
    }

    getQuestionStatistics(questionId:number) {

        let params = new HttpParams().set("questionId", questionId.toString());

        return this.http.get(`${Consts.WEB_SERVICE_URL}/questions/questionStatistics`, {params: params} )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Get Question Statistics failed');
            });
    }

    removeFromTodoList(questionId: number) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.delete(`${Consts.WEB_SERVICE_URL}/questions/removeFromTodoList/${questionId.toString()}`, {})
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Remove From Todo-List Failed');
            });
    }

    /*
    **************************************************
    *********************Attachments********************
    **************************************************
    */
    saveAttachment(file:File, refObjectType:number, refObjectId:number = null) {

        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        let formData:FormData = null;
        if(file != null) {
            formData = new FormData();
            formData.append('file',file);
        }
        return this.http.post(`${Consts.WEB_SERVICE_URL}/attachments/upload/${refObjectType}/${refObjectId ? '/' + refObjectId : ''}`,
            formData,
            {reportProgress: true, observe: 'events'} )
            .catch(error => {
                this.blockUiService.stop();
                return this.errorHandlerService.handleHttpRequest(error, 'Upload Attachment Failed');
            });
    }

    getAttachmentContent(refObjectType:number, refObjectId:number = null) {
        return this.http.get(
            `${Consts.WEB_SERVICE_URL}/attachments/download/${refObjectType}${refObjectId ? '/' + refObjectId : ''}`,
            {reportProgress: true, observe: 'events', responseType: 'blob'});
    }

    /*
    **************************************************
    *********************Positions********************
    **************************************************
    */

    publishPosition(position: Position) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.post(`${Consts.WEB_SERVICE_URL}/positions/publishPosition`, position)
            .finally( () => { this.blockUiService.stop()} )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Publish Position Failed');
            });
    }

    getMyPositions() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.get(`${Consts.WEB_SERVICE_URL}/positions`)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Getting Positions Failed');
            });
    }


    getPositionById(id: number) {

        let params = new HttpParams().set("positionId", id.toString());

        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.get(`${Consts.WEB_SERVICE_URL}/positions/getPositionById`, {params: params})
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, `Getting Position ${id} Failed`);
            });
    }

    /*
    **************************************************
    *********************Tests********************
    **************************************************
    */

    saveTest(test: Test) {
        console.log(test);
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.post(`${Consts.WEB_SERVICE_URL}/tests/createTest`, test)
            .finally( () => { this.blockUiService.stop()} )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Save Test Failed');
            });
    }

    updateProfile(profile: ProfileSettings, blockUi: boolean) {
        if(blockUi) this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.post(`${Consts.WEB_SERVICE_URL}/profileSettings/updateDetails`, profile)
            .finally( () => { if(blockUi) this.blockUiService.stop()} )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Update Profile Failed');
            });
    }

    getAttachmentDetails(refObjectType:number, refObjectId:number = null) {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);
        return this.http.get(
            `${Consts.WEB_SERVICE_URL}/attachments/details/${refObjectType}${refObjectId ? '/' + refObjectId : ''}`,)
            .finally( () => { this.blockUiService.stop()} )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, 'Get Attachment Details Failed');
            });
    }
}