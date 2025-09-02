import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styles: [
  ]
})
export class UserlistComponent implements OnInit {
  users: any;
  user_info: any[] = [];
  user_detail:any [] = []
  constructor(private http: HttpClient) { 
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  ngOnInit(): void {

    const url = 'https://dummyjson.com/users';
    this.http.get<any>(url).subscribe(data => {
      let size = data.users

      this.user_detail = data.users;
      
      for (let index = 0; index < size.length; index++) {
          this.user_info.push({
          name: data.users[index].firstName,
          department: data.users[index].company.department,
          gender: data.users[index].gender,
          bloodgroup: data.users[index].bloodGroup,
          height: data.users[index].height
        })    
      }
    
    })

  }

  Remove(index: number){
    this.user_detail.splice(index,1);
  }

}
