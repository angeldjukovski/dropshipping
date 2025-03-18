import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
forgetpassForm:any;
token:string = '';
constructor(private formBuilder:FormBuilder, private authService : AuthService, private router: Router, private route: ActivatedRoute) {}




ngOnInit(): void {
this.forgetpassForm = this.formBuilder.group ({
email:['',Validators.required],
newpassword:['',Validators.required],
confirmpassword:['',Validators.required],
})
this.route.queryParams.subscribe((params: any) => {
this.token = params['token'];
})
}
onSubmit() {
if(this.forgetpassForm.value)
console.log(this.forgetpassForm.value)

const {email,newpassword,} = this.forgetpassForm.value;
this.authService.restPassword(email,newpassword, this.token).subscribe ({
next : (response) => {
  if (response) {
    this.router.navigate(['/sign-in']);
  }
},
error: (error: any) => {
  console.log(error);
}
})
}

}
