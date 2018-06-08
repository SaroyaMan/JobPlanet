import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebApiService} from '../../web-api.service';
import {Position} from '../../../models/position.model';
import {Consts} from '../../consts';
import {PositionDetailService} from './position-detail.service';

@Component({
    selector: 'app-position-detail',
    templateUrl: './position-detail.component.html',
    styleUrls: ['./position-detail.component.css']
})
export class PositionDetailComponent implements OnInit {

    @Input() position:Position;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private webApiService:WebApiService,
                private positionDetailService: PositionDetailService,
                private router: Router,
                private route:ActivatedRoute,) { }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];

        this.webApiService.getPositionById(id)
            .subscribe(
                (response: Position) => {
                    this.position = response;
                    this.positionDetailService.setPosition(response);
                    console.log(this.position);
                }
            );
    }
}