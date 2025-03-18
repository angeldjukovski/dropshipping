import { Injectable } from "@angular/core";

interface TrackingError {
section: string
timestamp : number 
errorCode : number 
errorMessage : string 
}

@Injectable ({
providedIn : 'root'
})
export class LoggingService {
constructor() {}

trackError(error: TrackingError)  {
return error
}
}