import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WebApiService} from '../../web-api.service';

@Component({
    selector: 'app-position-detail',
    templateUrl: './position-detail.component.html',
    styleUrls: ['./position-detail.component.css']
})
export class PositionDetailComponent implements OnInit {

    constructor(private webApiService:WebApiService,
                private route:ActivatedRoute) { }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        console.log(`id=${id}`);

        this.webApiService.getPositionById(id)
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }
}