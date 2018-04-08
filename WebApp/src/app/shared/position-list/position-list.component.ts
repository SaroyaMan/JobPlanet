import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../models/position.model';

@Component({
    selector: 'app-position-list',
    templateUrl: './position-list.component.html',
    styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

    @Input() positions:Position[];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean;

    constructor() { }

    ngOnInit() {
    }

    onPositionItemClicked(p) {
        console.log("position item clicked");
    }
}
