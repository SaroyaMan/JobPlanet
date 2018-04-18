import {Component, Input, OnInit} from '@angular/core';
import {Consts} from '../../consts';
import {Position} from '../../../models/position.model';
import {Router} from '@angular/router';
import {PositionStatus} from '../../enums';

@Component({
    selector: 'app-position-cards',
    templateUrl: './position-cards.component.html',
    styleUrls: ['./position-cards.component.css']
})
export class PositionCardsComponent implements OnInit {

    @Input() positions:Position[] = [];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean;

    numOfChars = Consts.NUM_OF_CHARS - 35;
    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private router:Router) { }

    ngOnInit() {
    }

    onPositionItemClicked(p:Position) {
        this.router.navigate(['/home/position-detail', p.id])
    }

    getColorState(p:Position) {
        switch (p.status) {
            case PositionStatus.Closed:
                return '#f6615c';

            case PositionStatus.Pending:
                return '#92c18a';

            case PositionStatus.Opened:
            default: return '#6ea1cf';
        }
    }
}
