import {Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[appRankingColor]'
})
export class RankingColorDirective implements OnInit {

    @Input('appRankingColor') value:number = 5;
    @Input('maxValue') maxValue:number = 5;
    @HostBinding('style.backgroundColor') backgroundColor:string;

    constructor() { }

    ngOnInit() {
        this.backgroundColor = this.calculateColorByValue();
    }

    calculateColorByValue() {

        let greenVal = Math.round(Math.min((255.0*2.0)*(this.value/(this.maxValue)), 255));
        let redVal = Math.round(Math.min((255.0*2.0)*((this.maxValue-this.value)/(this.maxValue))));
        return "rgb(" + greenVal + "," + redVal + ",0)";
    }
}