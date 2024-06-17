import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../Core/header/header.component';
import { AuthService } from '../../services/auth.service';
import { ClientProfileService } from '../../services/client-profile.service';
@Component({
  selector: 'app-client-profile-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './client-profile-form.component.html',
  styleUrl: './client-profile-form.component.css',
})
export class ClientProfleFormComponent implements OnInit {
  client!: Client;
  id!: string;
  url =
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  constructor(
    public router: Router,
    private ClientService: ClientProfileService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.id = this.authService.getClaims().UserId;
    this.ClientService.getUserById(this.id).subscribe(
      (data) => (this.client = data),
      (error) => console.error('Error: ', error)
    );

    console.log('client= ' + this.client, this.id);
  }

  UpdatePhoto(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.client.imgURL = event.target.result;
      };
    }
  }

  UpdateProfile() {
    this.ClientService.updateProfile(this.id, this.client).subscribe(
      (ClientData) => {
        this.router.navigateByUrl('/profile');
        console.log('Profile updated:', ClientData);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  logout() {
    this.authService.logoutExternal();
    this.router.navigate(['/login']); // Redirect to login or any other route after logout
  }
}
