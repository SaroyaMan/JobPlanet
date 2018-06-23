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

    tabType:string = null;
    tabOptions = ['details', 'tests', 'solutions', 'statistics'];

    @Input() position:Position;

    dateFormat:string = Consts.DATE_FORMAT;

    constructor(private webApiService:WebApiService,
                private positionDetailService: PositionDetailService,
                private router: Router,
                private activatedRoute:ActivatedRoute,) { }

    ngOnInit() {

        this.tabType = this.activatedRoute.snapshot.params['type'];
        if(this.tabOptions.includes(this.tabType) == false)
            this.goToDefaultPage();
        this.activatedRoute.params.subscribe(params => {
            this.tabType = this.activatedRoute.snapshot.params['type'];
            if(this.tabOptions.includes(this.tabType) == false)
                this.goToDefaultPage();
        });


        let id = +this.activatedRoute.snapshot.params['id'];

        this.webApiService.getPositionById(id)
            .subscribe(
                (response: Position) => {
                    if(response == null)
                        this.router.navigate(['/home/my-positions']);

                    this.position = response;
                    this.positionDetailService.setPosition(response);
                }
            );
    }

    private goToDefaultPage() {
        this.router.navigate([`../${this.tabOptions[0]}`], {relativeTo: this.activatedRoute});
    }
}