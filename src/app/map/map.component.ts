import { Component, OnInit } from '@angular/core';
declare function initMap(): any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log(initMap())
  }

}
