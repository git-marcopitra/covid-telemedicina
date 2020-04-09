import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms'
import { User } from '../user';
import { UserService } from '../user.service';

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

  profileForm = this.fb.group({
    name: ['', Validators.minLength(2)],
    email: ['', Validators.email],
    phone: ['', Validators.minLength(9)],
    password: ['', Validators.minLength(8)]
  })


  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService, private modalsService:ModalService) { 
    super(modalService)
    this.fc = this.profileForm.controls
    this.google = true
  }
  
  ngOnInit(): void {
  }  

  
  ngDoCheck(): void{
    this.currentModal = this.modalsService.getModal();
    this.user = this.userService.getCurrentUser();
  }

  

  async onSubmit() {
    let user: User
    user = {
      name: this.fc.name.value,
      email: this.fc.email.value,
      phone: this.fc.phone.value,
      password: this.fc.password.value,
      doc: '',
      gender: '',
      birthYear:''
    }
    console.log(await this.userService.signUp(user))

    
  }

}
