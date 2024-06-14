import { Component } from '@angular/core';
import { LoginFormComponent } from '../../Registeration/login-form/login-form.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    LoginFormComponent
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
