import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {MatDialog,MatDialogModule,MatDialogRef} from '@angular/material/dialog'
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms' 
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthService } from '../shared/auth.service';
import { RouterLink, Router } from '@angular/router';
import { UserRole } from '../../types/user-role.enum';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatDialogModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
isOpen = false
singupForm : any
constructor(private formBuilder : FormBuilder, private authService:  AuthService, private router: Router ) {} 

ngOnInit() {
this.singupForm = this.formBuilder.group ({
id: ['',Validators.required],
firstName:['',Validators.required],
lastName:['',Validators.required],
email:['',Validators.required],
password:['',Validators.required],
confirmpassword:['',Validators.required],
  
})
}


onSubmit(){
  if(this.singupForm.valid)
  console.log(this.singupForm.valid)

  const {id,firstName, lastName,email,password,confirmpassword} = this.singupForm.value;
  const role = UserRole.Customer // this might cause issue with the admin panel
  this.authService.register(id,firstName,lastName,email,password,confirmpassword,role).subscribe({
    next: (response) => {
      if (response) {
        this.router.navigate(['/sign-in']);
      }
    },
    error: (error: any) => {
      console.log(error);
    }
  });
  }
  

  openSignIn():void {
    this.router.navigate(['/sign-in']);
    
    }
  
  

}