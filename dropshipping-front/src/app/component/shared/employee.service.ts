import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService } from "./notification.service";
import { switchMap, catchError,of, Observable } from "rxjs";
import { Employee } from "../../types/employee.interface";


@Injectable ({
providedIn : 'root',
})

export class EmployeeService {
private apiUrl = 'http://localhost:3000/api/employee'


constructor ( private http : HttpClient, private notificationService : NotificationService,)  {}  

createEmployee(id : string, firstName : string , lastName : string, email : string , password : string, gender : string, salary : number, education : string, role : string  )  { {
   const requestBody ={id , firstName , lastName , email  , password , gender , education, salary  , role}
   return this.http.post(`${this.apiUrl}`, requestBody). pipe (
   switchMap(() => {
   this.notificationService.showNotification('succesfull add') 
   return of (null)
   }),
    catchError((errorResponse) => {
     this.notificationService.showNotification(errorResponse.error.message);
     return of(null);
      })
   )
   }
}



getAllEmployees () : Observable <Employee[]> {
return this.http.get<Employee[]>(`${this.apiUrl}`)
}

updateEmployee(id : string, employee : Partial <Employee>): Observable <Employee> {
return this.http.patch<Employee>(`${this.apiUrl}/${id}`, employee)
}

deleteEmployee(id : string): Observable <void> {
return this.http.delete<void>(`${this.apiUrl}/${id}`, )
}

}