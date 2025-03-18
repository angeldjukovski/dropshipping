import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProfileService } from '../shared/edit-profile.service';
import { User } from '../../types/user.interface';
import { EditUser } from '../../types/edit-user.interface';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  editProfileForm: FormGroup; 
  id: string = '';
  profileExists: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private editProfileService: EditProfileService
  ) {
    this.editProfileForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
    });
  }

    ngOnInit() {
      this.authService.getMe().subscribe((user) => {
        if (user) {
          this.id = user.id;
          this.getUserData();
        }
      });
    }

    getUserData(): void {
      this.editProfileService.getUser(this.id).subscribe({
        next: (userData: EditUser | null) => {
          if (userData) {
            this.profileExists = true;
            this.editProfileForm.patchValue(userData);
          }
        },
        error: (error) => {
          console.error("Error fetching user data:", error); 
        },
      });
    }



  onUpdate(): void {
    if (this.editProfileForm.valid) {
      const profileData: EditUser = { id: this.id, ...this.editProfileForm.value };
      this.editProfileService.editProfile(profileData).pipe(
        catchError((error) => {
          console.error('Update failed:', error);
          return throwError(() => new Error(error.error.message || 'Update failed'));
        })
      ).subscribe(() => {
        this.router.navigate(['/profile']);
      });
    }
  }
}





