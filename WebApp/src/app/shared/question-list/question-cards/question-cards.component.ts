import {Component} from '@angular/core';
import {Consts} from '../../consts';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../auth/auth.service';
import {QuestionListComponent} from '../question-list.component';

@Component({
    selector: 'app-question-cards',
    templateUrl: './question-cards.component.html',
    styleUrls: ['./question-cards.component.css']
})
export class QuestionCardsComponent extends QuestionListComponent {


    numOfChars = Consts.NUM_OF_CHARS - 35;
    dateFormat:string = Consts.DATE_FORMAT;

    constructor(modalService:NgbModal,
                authService:AuthService) {
        super(modalService, authService);
    }

}

