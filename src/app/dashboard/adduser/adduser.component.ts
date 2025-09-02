import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styles: [
  ]
})
export class AdduserComponent implements OnInit {

  adduser_username: string;
  adduser_password: string;
  adduser_username_error: string;
  adduser_password_error: string;
  check_role_error: string;
  role_userlist: boolean;
  role_analytics: boolean;
  role_adduser: boolean;
  adduser_message: string;

  constructor(private router: Router) { 
    this.adduser_username = '';
    this.adduser_password = '';
    this.adduser_username_error = '';
    this.adduser_password_error = '';
    this.check_role_error = '';
    this.role_userlist = false;
    this.role_analytics = false;
    this.role_adduser = false;
    this.adduser_message = '';
  }

  ngOnInit(): void {
  }

  Add_User(){

    let list = JSON.parse(localStorage.getItem('list') || '[]');
    
    let password_encrypt = CryptoJS.SHA256(this.adduser_password).toString();
    
    let old_user = list.find((user: any) => user.username === this.adduser_username);
    let old_password = list.find((user: any) => user.password === password_encrypt);

    if(this.adduser_username === '' && this.adduser_password === '' && !this.role_userlist && !this.role_analytics && !this.role_adduser){
      this.adduser_username_error = 'Please Enter User Name';
      this.adduser_password_error = 'Please Enter Password';
      this.check_role_error = 'Choose at least any one Role';
    }
    else if(old_user && old_password){
      this.adduser_username_error = 'Choose another User Name';
      this.adduser_password_error = 'Choose another Password';
      this.check_role_error = '';
    }
    else if(this.adduser_username === ''){
      this.adduser_username_error = 'Please Enter User Name';
      this.adduser_password_error = '';
      this.check_role_error = '';
    }
    else if(this.adduser_username.length < 3){
      this.adduser_username_error = 'User Name at least have 3 characters';
      this.adduser_password_error = '';
      this.check_role_error = '';
    }
    else if(old_user){
      this.adduser_username_error = 'Choose another User Name';
      this.adduser_password_error = '';
      this.check_role_error = '';
    }
    else if(this.adduser_password === ''){
      this.adduser_password_error = 'Please Enter Password';
      this.adduser_username_error = '';
      this.check_role_error = '';
    }
    else if(this.adduser_password.length < 5){
      this.adduser_password_error = 'Password Length should be >= 5';
      this.adduser_username_error = '';
      this.check_role_error = '';
    }
    else if(old_password){
      this.adduser_password_error = 'Choose another Password';
      this.adduser_username_error = '';
      this.check_role_error = '';
    }
    else if(!this.role_userlist && !this.role_analytics && !this.role_adduser){
      this.check_role_error = 'Choose at least any one Role';
      this.adduser_username_error = '';
      this.adduser_password_error = '';
    }
    else{

      this.adduser_password = password_encrypt;
    
      list.push({
      username: this.adduser_username,
      password: this.adduser_password,
      userlist: this.role_userlist,
      analytics: this.role_analytics,
      adduser: this.role_adduser
      });

      localStorage.setItem('list', JSON.stringify(list));

      this.adduser_message = 'User Add Successfully';

      this.adduser_username = '';
      this.adduser_password = '';
      this.adduser_username_error = '';
      this.adduser_password_error = '';
      this.check_role_error = '';
      this.role_userlist = false;
      this.role_analytics = false;
      this.role_adduser = false;

      this.router.navigate(['/dashboard/adduser']);


      // localStorage.removeItem('list');

    }


  }

}
