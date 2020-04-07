import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-daily-test',
  templateUrl: './daily-test.component.html',
  styleUrls: ['./daily-test.component.css']
})
export class DailyTestComponent implements OnInit {

  phase: number

  testForm = this.fb.group({
    gender: ['', Validators.required],
    age: [null, Validators.required],
    docId: ['', Validators.required],
    travel: [0],
    people: [0]
  })

  geoLocation: {
    lat: number,
    long: number
  }

  fc: any

  constructor(private fb: FormBuilder) { 
    this.phase = 0
    this.fc = this.testForm.controls
  }

  ngOnInit(): void {
  
  }

  ngDoCheck(): void {
  }

  nextPhase(): void {
    this.phase++
  }
  
  firstPhase() {
    this.nextPhase()
    this.findMe()
  }

  prevPhase(): void {
    this.phase--
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setPosition(position);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setPosition(position: any) {
    this.geoLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    }
  }
  onSubmit() {

  }
}
