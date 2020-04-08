import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserCredential } from '../user';

@Component({
  selector: 'app-modal-sign-in',
  templateUrl: './modal-sign-in.component.html',
  styleUrls: ['./modal-sign-in.component.css', '../modal/modal.component.css']
})
export class ModalSignInComponent extends ModalComponent implements OnInit {

  signinForm = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)]
  })
  signinErrors = {
    email: 'Insira um número de identificação válido',
    password: 'Insira a sua palavra-passe'
  }
  googleSigninForm = this.fb.group({})

  fc: any
  users: any[]
  google: boolean
  error: string

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService) { 
    super(modalService)
    this.fc = this.signinForm.controls
    this.google = true
    this.error = ''
  }

  ngOnInit(): void {
    
  }

  async onSubmit() {
    let userCred: UserCredential
    userCred = {
      email: this.fc.email.value,
      password: this.fc.password.value
    }
    
    if(await this.userService.signIn(userCred)){
      this.changeModal('none')
    } else {
      this.error = 'Email ou senha inválido'
    }
  }

  cleanError() {
    this.error = ''
  }

  async googleLogin() {
    if(await this.userService.googleSignIn()){
      this.changeModal('none')
    } else {
      this.error = 'Login inválido'
    }
  }


}
