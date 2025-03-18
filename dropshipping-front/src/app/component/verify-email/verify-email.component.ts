import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {
verifyemailForm:any;
constructor(private formBuilder:FormBuilder, private authService : AuthService, private router: Router) {}




ngOnInit() {
this.verifyemailForm = this.formBuilder.group ({
email:['',Validators.required],
})
}
onSubmit() {
if(this.verifyemailForm.value)
console.log(this.verifyemailForm.value)

const {email,token} = this.verifyemailForm.value;
this.authService.verifyEmail(email,token).subscribe ({
next : (response) => {
  if (response) {
    this.router.navigate(['/forget-password']);
  }
},
error: (error: any) => {
  console.log(error);
}
})
}

}
