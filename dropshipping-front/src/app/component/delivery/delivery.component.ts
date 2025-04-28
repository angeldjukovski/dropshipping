import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeliveryService } from '../shared/delivery.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Delivery } from '../../types/delivery.interface';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, RouterLink, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
  deliveryForm!: FormGroup;
  userId: string = '';
  deliveryExists: boolean = false;
  

 constructor (private deliveryService : DeliveryService, private authService : AuthService, private router : Router, private formBuilder : FormBuilder)  {}  

 ngOnInit () : void {
 this.authService.getMe().subscribe((user) => {
 if(user)  {
 this.userId = user.id 
 this.elementsForm()
 this.getUserDelivery()
 }
 })
 } 
 
 
 elementsForm() : void {
  this.deliveryForm = this.formBuilder.group ({
  userId:[this.userId,Validators.required],
  name:['', Validators.required],
   email:['',[,Validators.required]],
   phoneNumber:['',Validators.required],
   address : ['',Validators.required],
   zipcode : ['',Validators.required],
  deliveryDay:['',[,Validators.required]],
  deliveryLocation:['',[,Validators.required]],
 })

}

getUserDelivery() : void {
this.deliveryService.getDelivery(this.userId).subscribe((deliveryData : Delivery | null) => {
if(deliveryData)  {
this.deliveryExists = true;
this.deliveryForm.patchValue(deliveryData)
}
})
}

onSubmit() : void {
if(this.deliveryForm.valid) {
console.log(this.deliveryForm.value)

const deliveryData : Delivery = this.deliveryForm.value
console.log(deliveryData)
if(this.deliveryExists)  {
this.onUpdate()
}else {
this.deliveryService.createDelivery(deliveryData).subscribe ({
next : (response) => {
if(response) {
this.router.navigate(['/profile'])
}
},
error : (error: any) => {
console.log(error)
}
})
}
}
}
onUpdate() : void {
if(this.deliveryForm.valid) {
const deliveryData : Delivery = this.deliveryForm.value
this.deliveryService.editDelivery(deliveryData).subscribe (() => {
this.router.navigate(['/profile'])
})
}

}



}

