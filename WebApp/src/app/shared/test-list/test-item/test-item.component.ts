import {Component, Input, OnInit} from '@angular/core';
import {Test} from '../../../models/test.model';
import {Consts} from '../../consts';

@Component({
    selector: 'app-test-item',
    templateUrl: './test-item.component.html',
    styleUrls: ['./test-item.component.css']
})
export class TestItemComponent implements OnInit {

    @Input() test:Test;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor() { }

    ngOnInit() {
    }

    startTest() {

    }
}
