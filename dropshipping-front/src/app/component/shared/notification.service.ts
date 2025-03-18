import { Injectable,inject } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable ({
providedIn: 'root'
})
export class NotificationService {
private _snackBar = inject(MatSnackBar)

constructor ()  {}

showNotification(message : string, action ? : string, duration : number = 5000)  {
this._snackBar.open (message,action, {
duration,
horizontalPosition: 'end',
verticalPosition : 'top'
})
}
}