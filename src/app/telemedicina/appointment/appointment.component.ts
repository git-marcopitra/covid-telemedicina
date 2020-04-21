import { Component, OnInit } from '@angular/core';
import { User,Test } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { FormBuilder } from '@angular/forms';
declare function setConsulta(user:User,test:Test,outros:any): any;
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  able: boolean
  wait: boolean
  patient: User
  fc:any
  sickForm = this.fb.group({
    sick: [''],
    sickName: [''],
    comm: [''],
    comment: ['']
  })

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.able = undefined
    this.wait = true
    this.fc = this.sickForm.controls
  }

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    if(this.able === undefined) {
      this.patient =  this.userService.getCurrentUser()
      this.able = (this.patient === undefined || this.patient === null || this.patient.doc === undefined || this.patient.doc === null) ? undefined : this.patient.doc > ''
    } else {
      this.wait = false
    }
  }
  
  async onSubmit() {
    let appointmentData = {
      preSick: this.fc.sick.value ? this.fc.sickName.value : '',
      comment: this.fc.comm.value ? this.fc.comment.value : ''
    }
    this.userService.setAppointmentData(appointmentData)
    if(this.userService.getLastTest()){
      
    await setConsulta(this.userService.getCurrentUser(),this.userService.getLastTest(),appointmentData).then(result=>{
     
    }).catch(error=>{
      
    })
  }else{
    
  }
  }
}
