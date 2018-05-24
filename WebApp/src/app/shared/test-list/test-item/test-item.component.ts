import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Test} from '../../../models/test.model';
import {Consts} from '../../consts';
import {TestModeService} from '../../../test-mode/test-mode.service';
import {CustomDialogComponent} from '../../../utils/custom-dialog/custom-dialog.component';
import {ModalDialogService} from 'ngx-modal-dialog';

@Component({
    selector: 'app-test-item',
    templateUrl: './test-item.component.html',
    styleUrls: ['./test-item.component.css']
})
export class TestItemComponent implements OnInit {

    @Input() test:Test;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private testModeService:TestModeService,
                private modalDialogService:ModalDialogService,
                private viewContainer: ViewContainerRef) { }

    ngOnInit() {
    }

    startTest() {
        this.testModeService.enterTestMode(this.test);
    }

    onStartTest(event:Event) {

        event.stopPropagation();


        this.modalDialogService.openDialog(this.viewContainer, {
            title: `Start Test #${this.test.id}`,
            childComponent: CustomDialogComponent,
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            data: 'Are you sure you want to start the test?',
            actionButtons: [
                {
                    text: 'Start',
                    buttonClass: 'btn btn-success',
                    onAction: () => this.startTest(),
                },
                {
                    text: 'Cancel',
                    buttonClass: 'btn btn-outline-danger',
                    onAction: () => true,
                }
            ]
        });
    }
}
