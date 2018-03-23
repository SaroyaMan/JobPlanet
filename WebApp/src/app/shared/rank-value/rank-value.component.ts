import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-rank-value',
    templateUrl: './rank-value.component.html',
    styleUrls: ['./rank-value.component.css']
})
export class RankValueComponent {

    @Input() rank = 0;

    constructor() { }
}