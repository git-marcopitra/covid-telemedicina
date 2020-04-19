import { Component, OnInit } from '@angular/core';
import { User,Test } from 'src/app/user';
import { UserService } from 'src/app/user.service';
declare function CreatePDF(user:User,test:Test): any;
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    CreatePDF(this.userService.getCurrentUser(),this.userService.getLastTest())
  }

  downloadResume(){
    
  }

}
