import { Component, OnInit } from '@angular/core';
import { User,Test,AppointmentData } from 'src/app/user';
import { UserService } from 'src/app/user.service';
declare function CreatePDF(user:User,test:Test,details:AppointmentData): any;
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  wait: boolean

  constructor(private userService: UserService) { 
    this.wait = false;
  }

  ngOnInit(): void {
  }

  async downloadResume(){
    
    if(this.userService.getAppointmentData()){
      this.wait = true
    if(await CreatePDF(this.userService.getCurrentUser(),this.userService.getLastTest(),this.userService.getAppointmentData()))
      this.wait = false
    else
      this.wait = false 
    }
  }

}
