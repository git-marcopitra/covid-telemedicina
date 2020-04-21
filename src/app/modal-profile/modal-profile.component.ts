import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms'
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css', '../modal/modal.component.css']
})
export class ModalProfileComponent extends ModalComponent implements OnInit {

  google: boolean
  user: User
  fc: any
  wait: boolean
  error: string

  profileForm = this.fb.group({
    name: ['', Validators.minLength(2)],
    email: ['', Validators.email],
    phone: ['', Validators.minLength(9)]
  })
  alter: boolean;


  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService, private modalsService:ModalService, private router: Router) { 
    super(modalService)
    this.fc = this.profileForm.controls
    this.google = true
    this.alter = true
  }
  
  ngOnInit(): void {
  }  

  
  ngDoCheck(): void{
    this.currentModal = this.modalsService.getModal();
    this.user = this.userService.getCurrentUser();
    if(this.user !== undefined && this.user !== null && this.alter){
      this.alter = false
      this.profileForm.setValue({
        name: this.user.name,
        email: this.user.email,
        phone: parseInt(this.user.phone) > 0 ? this.user.phone : null 
      })
    }
  }  

  async onSubmit() {
    this.wait = true
    let user: User
    user = {
      uid: this.user.uid,
      name: this.fc.name.value,
      email: this.fc.email.value,
      phone: this.fc.phone.value,
      level: this.user.level == -1 ? 0 : this.user.level,
      doc: this.user.doc,
      gender: this.user.gender,
      birthYear: this.user.birthYear,
      geo: this.user.geo
    }
    if(await this.userService.updateThisUser(user)){
      this.wait = false
      this.changeModal('none')
      if(this.userService.redirectUrl != ''){
        let url = this.userService.redirectUrl
        this.userService.redirectUrl = ''
        this.router.navigate([url])
      }
    }
    else {
      this.wait = false
      this.error = 'Erro inesperado, tente noutra altura'
    }

    
  }

}
