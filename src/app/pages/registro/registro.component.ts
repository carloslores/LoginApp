import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: UserModel;
  remember: false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
   }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })
    Swal.showLoading();
    this.auth.newUser(this.user)
    .subscribe( resp =>{
      console.log(resp);
      Swal.close();
      if (this.remember) {
        localStorage.setItem('email', this.user.email);
      }
      this.router.navigateByUrl('/home');
    }, err => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error de registro',
        text: err.error.error.message
      });
    });
  }
}
