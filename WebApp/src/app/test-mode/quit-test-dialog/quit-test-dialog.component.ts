import {Component, ComponentRef} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from 'ngx-modal-dialog';

@Component({
    selector: 'app-quit-test-dialog',
    templateUrl: './quit-test-dialog.component.html',
    styleUrls: ['./quit-test-dialog.component.css']
})
export class QuitTestDialogComponent implements IModalDialog {

    data:any;

    constructor() { }

    dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        this.data = options.data;
        this.data.password = '';
    }

}