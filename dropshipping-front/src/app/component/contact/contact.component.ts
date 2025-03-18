import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatCardModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
contactForm:any

constructor(private formBuilder:FormBuilder) {}

ngOnInit() :void {
this.contactForm = this.formBuilder.group ({
name:['',Validators.required],
email:['',[,Validators.required]],
message:['',Validators.required]

})
}
onSubmit() {
if(this.contactForm.valid) {
console.log(this.contactForm.value)
}
}
}