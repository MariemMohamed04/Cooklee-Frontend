import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { contactUsService } from '../_services/contact.service';


@Component({
  selector: 'app-contact-us',
  imports: [FormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  standalone: true,


})
export class ContactUsComponent {
  contactDto = {
    fullName: '',
    phoneNumber: '',
    body: ''
  };
  isSubmitting = false;
  formSubmitted = false;

constructor(private contactService : contactUsService){

}

  onSubmit() {
    this.formSubmitted = true;
    this.isSubmitting = true;
    if (this.validateForm()) {
      // Call your email sending logic or API here
      this.contactService.sendEmail(this.contactDto).subscribe(()=>{
        console.log('Form submitted:', this.contactDto);
        this.isSubmitting = false; 
        this.contactDto.fullName='';
        this.contactDto.phoneNumber='';
        this.contactDto.body='';
            });
      
    }
    else{
      this.isSubmitting = false; 

    }
  }

  validateForm(): boolean| string {
    return this.contactDto.fullName && this.contactDto.phoneNumber && this.validatePhoneNumber(this.contactDto.phoneNumber) && this.contactDto.body;
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    return /^[0-9]{10}$/.test(phoneNumber);
  }
}
