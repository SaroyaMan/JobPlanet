import {Component, Input, OnInit} from '@angular/core';
import {Test} from '../../models/test.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";
import {TestDetailComponent} from './test-detail/test-detail.component';

@Component({
    selector: 'app-test-list',
    templateUrl: './test-list.component.html',
    styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

    @Input() tests:Test[];
    @Input() sortBy:string = 'id';
    @Input() reverse:boolean;

    modalConfig:NgbModalOptions = {};

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
        this.modalConfig.size = 'lg';
        this.modalConfig.windowClass = 'animated slideInUp';
    }

    onTestItemClicked(test:Test) {

        let component = this.modalService.open(TestDetailComponent,this.modalConfig).componentInstance;
        // Pass data to component
        component.test = test;
        // component.onQuestionSolved.subscribe(
        //     (questionId) => {
        //         // this.onQuestionSolvedSecond.emit(this.questions.find(q => q.id == questionId))
        //     });

        $('.modal-content').animate({ opacity: 1 });
        $('.modal-backdrop').animate({ opacity: 0.9 });
    }
}