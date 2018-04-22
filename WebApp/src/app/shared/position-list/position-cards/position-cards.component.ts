import {Component} from '@angular/core';
import {Consts} from '../../consts';
import {Router} from '@angular/router';
import {PositionListComponent} from '../position-list.component';

@Component({
    selector: 'app-position-cards',
    templateUrl: './position-cards.component.html',
    styleUrls: ['./position-cards.component.css']
})
export class PositionCardsComponent extends PositionListComponent {

    numOfChars = Consts.NUM_OF_CHARS - 35;
    dateFormat:string = Consts.DATE_FORMAT;

    constructor(router:Router) {
        super(router);
    }
}
