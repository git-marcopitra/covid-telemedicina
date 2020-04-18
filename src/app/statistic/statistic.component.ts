import { Component, OnInit } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserModule } from '@angular/platform-browser';

declare function statistic():any;

declare var chartStatus:boolean;
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  wait: boolean;
k: boolean;

  constructor() { }

  ngOnInit(): void {  
    
  }

  ngDoCheck() {
    this.wait = chartStatus ? false : true
    if(this.k){
      statistic()
      this.k=true
    }
  
  }

  async teste(){
    let date=new Date()
    let stateUsers={"baixo":{"F":{}, "M":{}},
                    "medio": {"F":{}, "M":{}},
                    "alto":{"F":{}, "M":{}}}
    await statistic().on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
          var user = childSnapshot.val();
          var level=user.level < 35 ? "baixo" : user.level < 65 ? "medio" : "alto";
          var age= date.getFullYear()-user.birthYear<16 ? "criança" : date.getFullYear()-user.birthYear<20 ? "adolescente": date.getFullYear()-user.birthYear<65 ? "jovem": "adulto"; 

          if(user.level>0)
          if(stateUsers[level][user.gender][age]!=null)
          stateUsers[level][user.gender][age]++;
          else 
          stateUsers[level][user.gender][age]=1;
         
        
      })
      //resultado
      console.log(stateUsers.medio.M)
      
  })
  }

}
