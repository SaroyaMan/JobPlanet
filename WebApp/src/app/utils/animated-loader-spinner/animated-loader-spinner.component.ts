import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-animated-loader-spinner',
    templateUrl: './animated-loader-spinner.component.html',
    styleUrls: ['./animated-loader-spinner.component.css']
})
export class AnimatedLoaderSpinnerComponent implements OnInit {

    @Input() isCenter:boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
