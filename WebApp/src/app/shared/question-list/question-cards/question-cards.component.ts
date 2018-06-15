import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Consts} from '../../consts';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../auth/auth.service';
import {QuestionListComponent} from '../question-list.component';
import {QuestionState} from '../../enums';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-question-cards',
    templateUrl: './question-cards.component.html',
    styleUrls: ['./question-cards.component.css']
})
export class QuestionCardsComponent extends QuestionListComponent implements OnInit {

    @Input() questionState:QuestionState;

    numOfChars = Consts.NUM_OF_CHARS - 35;
    dateFormat:string = Consts.DATE_FORMAT;
    currPage = 1;
    QuestionState = QuestionState;

    currentRoute:string = null;

    constructor(modalService:NgbModal,
                authService:AuthService,
                private route:ActivatedRoute) {
        super(modalService, authService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.currentRoute = this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path;
    }

}

