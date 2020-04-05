import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel
  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  login(form: NgForm){
    if(form.invalid){
      return
    }
   
    this.auth.loging(this.user)
    .subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err.error.error.message);
    })
  }  
}