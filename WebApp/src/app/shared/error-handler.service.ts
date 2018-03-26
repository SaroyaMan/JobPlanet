import {Injectable} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlerService {

    constructor(private toast:ToastsManager,
                private router:Router) {}

    handleHttpRequest(error, title?:string) {

        console.log(error);
        console.log("errorStatus = " + error.status);
        if(error.status === 0) {
            this.toast.error("The server is currently down", "Server is down");
        }
        else if(error.status === 401) {
            this.router.navigate(["/auth"]);
        }
        else if(title  && error && error.error) {
            for(let err of Object.keys(error.error)) {
                this.toast.error(error.error[err], title);
            }
        }
        return Observable.throw(error);
    }
}