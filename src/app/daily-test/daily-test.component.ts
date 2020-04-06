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
    docId: ['', Validators.required]
  })

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
  
  prevPhase(): void {
    this.phase--
  }
}
