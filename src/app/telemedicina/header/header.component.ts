import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selected: number

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    let path = this.location.path()
    this.selected = path == '/telemedicina/calendar' ? 1 : path == '/telemedicina/appointment' ? 2 : path == '/telemedicina/resume' ? 3 : 0;

  }

  goBack() {
    this.location.back();
  }

  goTo($path: string){
    this.selected = $path == '/telemedicina/calendar' ? 1 : $path == '/telemedicina/appointment' ? 2 : $path == '/telemedicina/resume' ? 3 : 0;
    this.router.navigate([$path])
  }

}
