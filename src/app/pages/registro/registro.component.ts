import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: UserModel;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.user = new UserModel();
   }

  onSubmit(form: NgForm) {
    if (form.invalid){
      return
    }

    this.auth.newUser(this.user)
    .subscribe( resp =>{
      console.log(resp);
    }, err => {
      console.log(err.error.error.message);
    })
  }
}
