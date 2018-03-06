import {ToastOptions} from 'ng2-toastr';

export class CustomToastOption extends ToastOptions {
    animate = 'flyLeft'; // you can override any options available
    newestOnTop = false;
    showCloseButton = true;
    positionClass = 'toast-bottom-left';
    toastLife = 3500;
}