import { Component, OnInit } from '@angular/core';
import {TestModeService} from './test-mode.service';

@Component({
    selector: 'app-test-mode',
    templateUrl: './test-mode.component.html',
    styleUrls: ['./test-mode.component.css']
})
export class TestModeComponent implements OnInit {

    constructor(private testModeService:TestModeService) { }

    ngOnInit() {
    }

}
