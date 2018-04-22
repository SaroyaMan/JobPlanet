import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../models/position.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-position-list',
    templateUrl: './position-list.component.html',
    styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

    @Input() protected positions:Position[];
    @Input() protected sortBy:string = 'id';
    @Input() protected reverse:boolean;

    constructor(private router:Router) { }

    ngOnInit() {
    }

    onPositionItemClicked(p:Position) {
        this.router.navigate(['/home/position-detail', p.id])
    }
}
