import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styles: [
  ]
})
export class AnalyticsComponent implements OnInit {
  users: any;
  bloodGroup: any;
  gender: any;
  height: any[] = [];
  department: any[] = [];
  constructor(private http: HttpClient) { 
    this.bloodGroup = {
      A_positive: 0,
      A_negative: 0,
      B_positive: 0,
      B_negative: 0,
      O_positive: 0,
      O_negative: 0,
      AB_positive: 0,
      AB_negative: 0
    }

    this.gender = {
      male: 0,
      female: 0
    }

  }

  ngOnInit(): void {
    const url = 'https://dummyjson.com/users';
    this.http.get<any>(url).subscribe(data => {
      this.users = data.users;
      
      for (let index = 0; index < this.users.length; index++) {
        if(data.users[index].bloodGroup === 'A+'){
          this.bloodGroup.A_positive++; 
        }
        else if(data.users[index].bloodGroup === 'A-'){
          this.bloodGroup.A_negative++;
        }
        else if(data.users[index].bloodGroup === 'O+'){
          this.bloodGroup.O_positive++;
        }
        else if(data.users[index].bloodGroup === 'O-'){
          this.bloodGroup.O_negative++;
        }
        else if(data.users[index].bloodGroup === 'B+'){
          this.bloodGroup.B_positive++;
        }
        else if(data.users[index].bloodGroup === 'B-'){
          this.bloodGroup.B_negative++;
        }
        else if(data.users[index].bloodGroup === 'AB+'){
          this.bloodGroup.AB_positive++;
        }
        else if(data.users[index].bloodGroup === 'AB-'){
          this.bloodGroup.AB_negative++;
        }

      }

      for (let index = 0; index < this.users.length; index++) {
        if(data.users[index].gender === 'male'){
          this.gender.male++;
        }
        else if(data.users[index].gender === 'female'){
          this.gender.female++;
        }
      }

      for (let index = 0; index < this.users.length; index++) {
        this.height.push({
          name: data.users[index].firstName,
          height: data.users[index].height
        })
      }

      for (let index = 0; index < this.users.length; index++) {
        
        let _department = data.users[index].company.department;
        let old_department = this.department.find(d => d.name === _department);
        console.log(old_department)

        if (old_department) {
          old_department.count++;
        }
        else {
          this.department.push({
            name: _department,
            count: 1
          });
        }
      }

      this.Blood_Group('line','line_chart');
      this.Gender('bar','bar_chart');
      this.Height('doughnut','doughnut_chart');
      this.Department('pie','pie_chart');
    })

  }

  
  Blood_Group(type: any, id: any){
    
    const chart = new Chart(id, {
      type: type,
      data: {
        labels: ['A+','A-','B+','B-','O+','O-','AB+','AB-'],
        datasets: [{
          label: 'User Blood Group',
          data: [
            this.bloodGroup.A_positive,
            this.bloodGroup.A_negative,
            this.bloodGroup.B_positive,
            this.bloodGroup.B_negative,
            this.bloodGroup.O_positive,
            this.bloodGroup.O_negative,
            this.bloodGroup.AB_positive,
            this.bloodGroup.AB_negative,
          ],
        }]
      }
    })

  }

  Gender(type: any, id: any){
    
    const chart = new Chart(id, {
      type: type,
      data: {
        labels: ['Male','Female'],
        datasets: [{
          label: 'User Gender',
          data: [
            this.gender.male,
            this.gender.female
          ],
        }]
      }
    })

  }

  Height(type: any, id: any){
    
    const chart = new Chart(id, {
      type: type,
      data: {
        labels: this.height.map(h => h.name),
        datasets: [{
          label: 'User Height',
          data: this.height.map(h => h.height)
        }]
      }
    })

  }

  Department(type: any, id: any){
    
    const chart = new Chart(id, {
      type: type,
      data: {
        labels: this.department.map(d => d.name),
        datasets: [{
          label: 'User Department',
          data: this.department.map(d => d.count)
        }]
      }
    })

  }


}
