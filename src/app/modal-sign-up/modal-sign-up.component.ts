import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms'
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal-sign-up',
  templateUrl: './modal-sign-up.component.html',
  styleUrls: ['./modal-sign-up.component.css', '../modal/modal.component.css']
})
export class ModalSignUpComponent extends ModalComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', Validators.minLength(2)],
    email: ['', Validators.email],
    phone: ['', Validators.minLength(9)],
    password: ['', Validators.minLength(8)]
  })

  googleSignUpForm = this.fb.group({})

  google: boolean
  wait: boolean
  fc: any
  error: string

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService) { 
    super(modalService)
    this.fc = this.signupForm.controls
    this.google = true
    this.wait = false
    this.error = ''
  }
  
  ngOnInit(): void {
  }  

  async onSubmit() {
    this.wait = true
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
    if(await this.userService.signUp(user)){
      this.wait = false
      this.changeModal('none')
    }
    else{
      this.wait = false
      this.error = "Erro ao cadastrar"
    }

    
  }

  async googleSignUp() {
    this.wait = true
    if(await this.userService.googleSignUp()){
      this.wait = false
      this.changeModal('profile')
    }
    else{
      this.wait = false
      this.error = "Erro ao cadastrar tente manualmente"
    }
  }

}
