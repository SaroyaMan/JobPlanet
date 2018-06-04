import { Injectable } from '@angular/core';

@Injectable()
export class SfxService {

    private audios:any = {};

    constructor() {

    }

    playSoundEffect(sfxName:string) {

        if(!this.audios[sfxName]) {
            this.audios[sfxName] = new Audio(`/assets/sfx/${sfxName}`);
            this.audios[sfxName].load();
        }

        this.audios[sfxName].play();
    }
}

export class SFX {

    public static readonly Notification = "notification.mp3";
    public static readonly Error = "error.mp3";
}