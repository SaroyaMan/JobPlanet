import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../../models/position.model';
import {Consts} from '../../consts';
import {PositionStatus} from '../../enums';

@Component({
    selector: 'app-position-item',
    templateUrl: './position-item.component.html',
    styleUrls: ['./position-item.component.css']
})
export class PositionItemComponent implements OnInit {

    dateFormat:string = Consts.DATE_FORMAT;
    PositionStatus = PositionStatus;

    @Input() position: Position;

    constructor() { }

    ngOnInit() {
    }

}
