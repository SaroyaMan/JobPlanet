import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../../../models/position.model';
import {Consts} from '../../../consts';

@Component({
    selector: 'app-position-tests',
    templateUrl: './position-tests.component.html',
    styleUrls: ['./position-tests.component.css']
})
export class PositionTestsComponent implements OnInit {

    @Input() position:Position;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor() {}

    ngOnInit() {
        console.log(this.position);
    }

}
