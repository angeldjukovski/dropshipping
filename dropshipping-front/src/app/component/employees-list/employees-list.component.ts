import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Employee } from '../../types/employee.interface';
import { User } from '../../types/user.interface';
import { EmployeeService } from '../shared/employee.service';
import { AuthService } from '../shared/auth.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Gender } from '../../types/gender.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { UserRole } from '../../types/user-role.enum';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatSelectModule,FormsModule,MatIcon, MatButtonModule, ReactiveFormsModule, MatTableModule,MatFormFieldModule,MatInputModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {

@ViewChild(MatPaginator) paginator! : MatPaginator

username : string = ''
dataSource = new MatTableDataSource<Employee>()
user : User | null = null 
displayColumns  : string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'education', 'salary', 'actions',]
employee : Employee[] = [] 
employeeForm! : FormGroup
constructor(private employeeService : EmployeeService, private authService : AuthService, private formBuilder : FormBuilder, private router : Router )  {}

editRowID : string | null = null 
editedEmployee : Partial <Employee> = {}




elementsForm() {
this.employeeForm = this.formBuilder.group ({
id: ['', Validators.required],
firstName : ['', Validators.required], 
lastName : ['', Validators.required], 
email :  ['', Validators.required], 
password : ['', Validators.required], 
gender : [Gender.Other, Validators.required], 
salary : ['', Validators.required],
education : ['', Validators.required],

})
} 

ngAfterViewInit() : void {
this.dataSource.paginator = this.paginator
}  

ngOnInit () {
  this.authService.getMe().subscribe ({
    next : (data) => {
    if(data?.role !== 'Admin') {
    this.router.navigate(['/'])
    return
    }
    this.user = data
    },
  })
  this.authService.getMe().subscribe((user : any) => {
  if (user)  {
  this.username = user.id
  this.getAllEmployees()
  }
  })
  this.elementsForm()
  }
   
  
  getAllEmployees() : void {
  console.log('All Employees are fetched')
  this.employeeService.getAllEmployees().subscribe ({
  next : (employee : Employee[]) => {
  this.dataSource.data = employee
  }
  })

  }
  

  applyFilter(event : Event): void  {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase() 
  this.dataSource.filter = filterValue
  }
  

  deleteEmployee(id : string) : void {
    if(confirm('Do you want to delete this employee ?')) { 
      this.employeeService.deleteEmployee(id).subscribe(() => this.getAllEmployees())
      }
      }
  
      startEdit ( employee : Employee): void {
        this.editRowID = employee.id;
        this.editedEmployee = {}
        }
       

      cancelEdit()  {
      this.editRowID = null 
      this.editedEmployee = {}
      }



      saveEdit(id : string)  {
      const originalEmployee = this.dataSource.data.find(employee => employee.id === id)
      if(!originalEmployee) return 
      const updatedEmployee : Employee = {...originalEmployee, ...this.editedEmployee}
      this.employeeService.updateEmployee(id,updatedEmployee).subscribe(() => {
      this.getAllEmployees()
      this.cancelEdit()
      })
      }
    
      OnSubmit(): void {
        if (this.employeeForm.valid) {
          const { id, firstName, lastName, email, password, gender, education, salary } = this.employeeForm.value;
          const role = UserRole.Employee;
    
      
          const payload = { id, firstName, lastName, email, password, gender, education, salary: salary, role };
          console.log('Submitting payload:', payload);
      
          this.employeeService.createEmployee(id, firstName, lastName, email, password, gender, salary, education, role)
            .subscribe({
              next: (response) => {
                if (response) {
                  this.router.navigate(['employees-list']);
                }
              },
              error: (error: any) => {
                console.error('Submission error:', error);
              }
            });
        } else {
          console.warn('Form invalid', this.employeeForm.errors);
        }
      }
    
      
  usersLists () {
    this.router.navigate(['/users-lists'])
    }
  
    bookLists () {
      this.router.navigate(['/books-lists'])
    }
  
    deliveriesLists () {
      this.router.navigate(['/deliveries-lists'])
    }
  
    ordersLists()  {
    this.router.navigate(['/orders-lists'])
    }
  
    adminPanel()  {
    this.router.navigate(['/admin-panel'])
    }
     








  }
    



    