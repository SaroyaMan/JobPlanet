import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../../../models/position.model';

@Component({
    selector: 'app-position-content',
    templateUrl: './position-content.component.html',
    styleUrls: ['./position-content.component.css']
})
export class PositionContentComponent implements OnInit {

    @Input() position:Position;

    constructor() { }

    ngOnInit() {
        console.log(this.position);
    }

}
