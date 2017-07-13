import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    //Pass in the user object
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //Validate required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show("All fields must be filled in.", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show("Please enter a valid email", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register user using the API
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessagesService.show("Congratulations! Your account is now registered.", {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      } 
      else{
        this.flashMessagesService.show("Account not registered", {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/register']);
        }
    });
  }

}
