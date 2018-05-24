import {Component, ComponentRef} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from 'ngx-modal-dialog';

@Component({
    selector: 'app-custom-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements IModalDialog {

    parentText: string;

    constructor() { }

    dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        this.parentText = options.data;
    }

}