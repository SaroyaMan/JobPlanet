import {Injectable, ViewContainerRef} from '@angular/core';

@Injectable()
export class UtilsService {

    rootViewContainerRef:ViewContainerRef;

    constructor() { }

    setRootViewContainerRef(rootViewContainerRef:ViewContainerRef) {
        this.rootViewContainerRef = rootViewContainerRef;
    }

    getRootViewContainerRef() {
        return this.rootViewContainerRef;
    }
}