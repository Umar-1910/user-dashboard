import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  role_userlist: boolean;
  role_analytics: boolean;
  role_adduser: boolean;
  constructor() { 
      let name = localStorage.getItem('name');
      let list = JSON.parse(localStorage.getItem('list') || '[]');
      let role = list.find((user: any) => user.username === name);

      this.role_userlist = role.userlist;
      this.role_analytics = role.analytics;
      this.role_adduser = role.adduser;
  }

  ngOnInit(): void {
  }

}
