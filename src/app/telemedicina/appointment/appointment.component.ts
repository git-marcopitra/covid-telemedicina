import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  able: boolean
  wait: boolean
  patient: User

  constructor(private userService: UserService) { 
    this.able = undefined
    this.wait = true
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    if(this.able === undefined) {
      this.patient =  this.userService.getCurrentUser()
      this.able = (this.patient === undefined || this.patient === null) || this.patient.doc === undefined ? undefined : this.patient.doc.length > 0
    } else {
      this.wait = false
    }

  }

}
