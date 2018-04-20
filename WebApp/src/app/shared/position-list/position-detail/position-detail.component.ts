import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebApiService} from '../../web-api.service';
import {Position} from '../../../models/position.model';
import {Consts} from '../../consts';

@Component({
    selector: 'app-position-detail',
    templateUrl: './position-detail.component.html',
    styleUrls: ['./position-detail.component.css']
})
export class PositionDetailComponent implements OnInit {

    @Input() protected position:Position;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private webApiService:WebApiService,
                private route:ActivatedRoute) { }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];

        this.webApiService.getPositionById(id)
            .subscribe(
                (response) => {
                    this.position = response;
                    console.log(this.position);
                }
            );
    }
}