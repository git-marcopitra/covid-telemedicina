import { Component, OnInit } from '@angular/core';

declare function charts(): any;
declare var dataPieChart:any;

declare var chartStatus:boolean;
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  wait: boolean;
  control: boolean;
  all:number;
  low: number;
  med: number;
  high: number;

  constructor() {
    this.control = true
   }

  ngOnInit(): void {  
    charts()
  }

  ngDoCheck() {
    this.wait = chartStatus ? false : true
    if(!this.wait && this.control){
      this.all = dataPieChart['alto'] + dataPieChart['medio'] + dataPieChart['baixo'];
      this.high = dataPieChart['alto'];
      this.med = dataPieChart['medio'];
      this.low = dataPieChart['baixo'];
      this.control = false;
    }
  }
}
