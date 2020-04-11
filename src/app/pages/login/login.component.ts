import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;
  remember = false;
  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.remember = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })
    Swal.showLoading();
    this.auth.loging(this.user)
    .subscribe( res => {
      console.log(res);
      Swal.close();
      if (this.remember) {
        localStorage.setItem('email', this.user.email);
      }
      this.router.navigateByUrl('/home');
    }, err => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
  }
}