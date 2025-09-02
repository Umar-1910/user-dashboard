import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  new_username: string;
  new_password: string;
  user_role: string;
  username_error: string;
  password_error: string;
  user_role_error: string;

  constructor(private router: Router) { 
    this.new_username = '';
    this.new_password = '';
    this.user_role = '';
    this.username_error = '';
    this.password_error = '';
    this.user_role_error = '';
  }

  ngOnInit(): void {
  }

  register_user(){

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    let password_encrypt = CryptoJS.SHA256(this.new_password).toString();

    let old_user = users.find((user: any) => user.username === this.new_username);
    let old_password = users.find((user: any) => user.password === password_encrypt);

    if(this.new_username === '' && this.new_password === '' && this.user_role === ''){
      this.username_error = 'Please Enter User Name';
      this.password_error = 'Please Enter Password';
      this.user_role_error = 'Choose any one Role';
    }
    else if(old_user && old_password){
      this.username_error = 'Choose another User Name';
      this.password_error = 'Choose another Password';
      this.user_role_error = '';
    }
    else if(this.new_username === ''){
      this.username_error = 'Please Enter User Name';
      this.password_error = '';
      this.user_role_error = '';
    }
    else if(this.new_username.length < 3){
      this.username_error = 'User Name at least have 3 characters';
      this.password_error = '';
      this.user_role_error = '';
    }
    else if(old_user){
      this.username_error = 'Choose another User Name';
      this.password_error = '';
      this.user_role_error = '';
    }
    else if(this.new_password === ''){
      this.password_error = 'Please Enter Password';
      this.username_error = '';
      this.user_role_error = '';
    }
    else if(this.new_password.length < 5){
      this.password_error = 'Password Length should be >= 5';
      this.username_error = '';
      this.user_role_error = '';
    }
    else if(old_password){
      this.password_error = 'Choose another Password';
      this.username_error = '';
      this.user_role_error = '';
    }
    else if(this.user_role === ''){
      this.user_role_error = 'Choose any one Role';
      this.username_error = '';
      this.password_error = '';
    }
    else{

      this.new_password = password_encrypt;
    
      users.push({
      username: this.new_username,
      password: this.new_password,
      role: this.user_role
      });

      localStorage.setItem('users', JSON.stringify(users));

      localStorage.setItem('register','ok');

      this.router.navigate(['/authentication/login']);

      // localStorage.removeItem('users');

    }

  
  }

}