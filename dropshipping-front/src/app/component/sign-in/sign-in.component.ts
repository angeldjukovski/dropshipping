import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router,} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';
import { Sign } from 'crypto';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
singinForm:any;



constructor( private formBuilder :FormBuilder,  private router: Router, private authService : AuthService,)  {}

ngOnInit():void {
this.singinForm = this.formBuilder.group ({
email:['',Validators.required],
password:['',Validators.required]
})
}


onSubmit(){
if(this.singinForm.valid)
console.log(this.singinForm.valid)
const {email,password} = this.singinForm.value;
this.authService.login(email,password).subscribe ({
next : response => { 
  if(response) {
    this.router.navigate(['/profile'])
  }
}
})
}

onSignUp():void {
 this.router.navigate(['/register'])
  }
    
  onForgetPassword():void {
    this.router.navigate(['/verify-email'])
    }


}