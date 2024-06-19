import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Client } from '../../models/client';
import { ClientProfileService } from '../../services/client-profile.service';
import { AuthService } from '../../services/auth.service';
import { ChefPageService } from '../../services/chef-page.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfleComponent implements OnInit {

client!:Client
id!:string
url=""

constructor(public router:Router, private ClientService:ClientProfileService, private authService:AuthService, private chefService:ChefPageService){

}
 

ngOnInit(): void {
  
this.id = this.authService.getClaims().UserId
this.ClientService.getProfile(this.id).subscribe(
  data => this.client=data,
  error => console.error('Error fetching profile:', error)
);
}


  

  EditProfile(){
    this.router.navigateByUrl("/ClientForm")
  }

  CreateChefPage(){


    this.router.navigateByUrl("/ChefPageForm")
  }
}
