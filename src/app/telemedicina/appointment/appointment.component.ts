import { Component, OnInit } from '@angular/core';
import { User,Test } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modal.service';
declare function setConsulta(user:User,test:Test,outros:any): any;
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  able: boolean
  wait: boolean
  action: string
  patient: User
  submitText: string
  fc:any
  sickForm = this.fb.group({
    sick: [''],
    sickName: [''],
    comm: [''],
    comment: ['']
  })
  idDought: boolean


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private modalService: ModalService) { 
    this.able = undefined
    this.wait = true
    this.fc = this.sickForm.controls
    this.submitText = "Marcar Consulta"
    this.action = "consult"
    this.idDought = false
  }

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    if(this.able === undefined || this.idDought) {
      this.patient =  this.userService.getCurrentUser()
      if(this.patient === undefined || this.patient === null || this.patient.birthYear === undefined || this.patient.birthYear === null){
        this.able = undefined;
      } else {
        this.able =  this.patient.birthYear > ''
        if(this.patient.doc == ''){
          this.submitText = "Confirmar Identidade"
          this.action = "identity"
          this.idDought = false
        } else {
          this.submitText = "Marcar Consulta"
          this.action = "consult"
          this.idDought = false
        }
      }
    } else {
      this.wait = false
    }
  }
  
  async onSubmit() {
    if(this.action == "consult"){
      this.submitText = "Aguarde..."
      let appointmentData = {
        preSick: this.fc.sick.value ? this.fc.sickName.value : '',
        comment: this.fc.comm.value ? this.fc.comment.value : ''
      }
      this.userService.setAppointmentData(appointmentData)
      if(this.userService.getLastTest()){
        await setConsulta(this.userService.getCurrentUser(),this.userService.getLastTest(),appointmentData)
        .then(() =>{
          this.action = "show"
          this.submitText = "Consulta Marcada, Ver Consulta"
        })
        .catch(() => {
          this.submitText = "Erro! tente noutra altura"
        })
      } else {
        this.submitText = "Tem que fazer um teste Antes"
        this.action = "test"
      }
    } else if(this.action == "test") {
      this.router.navigate(['/dailytest'])
    } else if(this.action == "show") {
      this.router.navigate(['/telemedicina/calendar'])
    } else if(this.action == "identity") {
      this.modalService.setModal('bi')
      this.idDought = true
    }
  }
}
