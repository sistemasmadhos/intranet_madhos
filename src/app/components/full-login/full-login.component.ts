import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-full-login',
  templateUrl: './full-login.component.html',
  styleUrls: ['./full-login.component.css']
})
export class FullLoginComponent implements OnInit {


  loginForm: FormGroup;
  send: boolean;

  constructor(private _myservice: AuthService, private router: Router){
    this.loginForm = new FormGroup({
      user: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }
  


  ngOnInit() {
    console.log(localStorage.getItem('intrnaet-rol'));
  }

  validateKey(event){
    console.log('event', event)
    if (event.keyCode === 13) { 
      this.login();
    }
  }

  login(){
    //this.send = true;
    console.log(localStorage.getItem('token'));
    if (this.loginForm.valid) {
      this._myservice.login(this.loginForm.value)
        .subscribe(
          data => {
            console.log('login');
            if(data['login']){
               localStorage.setItem('token', data['token'].toString());
               localStorage.setItem('intrnaet-rol', data['rol'].toString());
               this.router.navigate(['']);
            } else {
              alert('Usuario o Contraseña incorrecta');
            }            
          },
          error => { 
            alert('se presento un error por favor intente de nuevo.')
          }
        );
      console.log('final');
    }
  }

  

}
