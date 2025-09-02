import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  username_error: string;
  password_error: string;
  // message: string = '';

  constructor(private router: Router) { 
    this.username = '';
    this.password = '';
    this.username_error = '';
    this.password_error = '';

    // if(localStorage.getItem('register') === 'ok'){
    //   this.message = 'Registration Successful';
    //   localStorage.removeItem('register');
    // }

  }

  ngOnInit(): void {

    if(localStorage.getItem('name')){
      localStorage.removeItem('name');
    }
    
    if (localStorage.getItem('login') === 'ok') {
      localStorage.removeItem('login');
    }

  }

  login_user(){
    
    let list = JSON.parse(localStorage.getItem('list') || '[]');

    let password_decrypt = CryptoJS.SHA256(this.password).toString();

    let exist_user = list.find((user: any) => user.username === this.username);
    let exist_password = list.find((user: any) => user.password === password_decrypt);

    if(this.username === '' && this.password === ''){
      this.username_error = 'Please Enter User Name';
      this.password_error = 'Please Enter User Password';
    }
    else if(!exist_user && !exist_password){
      this.username_error = 'User Name is not exist';
      this.password_error = 'Password is not exist';
    }
    else if(this.username === ''){
      this.username_error = 'Please Enter User Name';
    }
    else if(!exist_user){
      this.username_error = 'User Name is not exist';
    }
    else if(this.password === ''){
      this.password_error = 'Please Enter Password';
    }
    else if(exist_user.password !== password_decrypt){
      this.password_error = 'Invalid Password';
    }
    else{

      localStorage.setItem('name',exist_user.username);
      localStorage.setItem('login','ok');

      if(exist_user.userlist === true){
        this.router.navigate(['/dashboard/userlist']);
      }
      else if(exist_user.analytics === true){
        this.router.navigate(['/dashboard/analytics']);
      }
      else if(exist_user.adduser === true){
        this.router.navigate(['/dashboard/adduser']);
      }

    }
    
  }

}
