import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BlockUiService} from '../utils/block-ui/block-ui.service';
import {ErrorHandlerService} from './error-handler.service';
import {Consts} from './consts';

@Injectable()
export class WebApiService {

    constructor(private http:HttpClient,
                private blockUiService:BlockUiService,
                private errorHandlerService:ErrorHandlerService,
                private router:Router) {}

    getSkills() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.get(`${Consts.WEB_SERVICE_URL}/skills`)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, "Skills Failed");
            })
    }

    getCategoriesSkills() {
        this.blockUiService.start(Consts.BASIC_LOADING_MSG);

        return this.http.get(`${Consts.WEB_SERVICE_URL}/skills/getAllCategories`)
            .finally( () => this.blockUiService.stop() )
            .catch(error => {
                return this.errorHandlerService.handleHttpRequest(error, "Skills Failed");
            })
    }
}
