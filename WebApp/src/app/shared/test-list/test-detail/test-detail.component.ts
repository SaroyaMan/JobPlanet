import {Component, Input, OnInit} from '@angular/core';
import {Test} from '../../../models/test.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Question} from '../../../models/question.model';

@Component({
    selector: 'app-test-detail',
    templateUrl: './test-detail.component.html',
    styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {

    @Input("test") test:Test;
    questions:Question[] = [];

    constructor(private activeModal:NgbActiveModal,) { }

    ngOnInit() {
        console.log(this.test);

        this.questions = this.test.questionTests.map(qt => qt.question);
    }

    quitModal() {
        this.activeModal.close();
    }

}
