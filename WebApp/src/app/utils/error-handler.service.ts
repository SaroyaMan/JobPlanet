import {Injectable} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';
import {SFX, SfxService} from './sfx.service';
import {Consts} from '../shared/consts';

@Injectable()
export class ErrorHandlerService {

    constructor(private toast:ToastsManager,
                private router:Router,
                private sfxService:SfxService) {}

    handleHttpRequest(error, title?:string) {

        Consts.IS_DEBUG && console.log(error);

        if(error.status === 0) {
            this.showErrorToClient("The server is currently down", "Server is down");

        }
        else if(error.status === 401) {
            this.router.navigate(["/auth"]);
        }
        else if(title  && error && error.error) {
            for(let err of Object.keys(error.error)) {
                this.showErrorToClient(error.error[err], title);
            }
        }
        else if(title  && error) {
            this.showErrorToClient(error.statusText, title);
        }
        return Observable.throw(error);
    }

    private showErrorToClient(message:string, title:string) {
        this.toast.error(message, title);
        this.sfxService.playSoundEffect(SFX.Error);
    }
}