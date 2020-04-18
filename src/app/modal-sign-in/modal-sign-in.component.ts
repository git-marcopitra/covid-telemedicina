import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserCredential } from '../user';
import { Router } from '@angular/router';

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
  wait: boolean

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService, private router: Router) { 
    super(modalService)
    this.fc = this.signinForm.controls
    this.google = true
    this.error = ''
    this.wait = false
  }

  ngOnInit(): void {
    
  }

  async onSubmit() {
    this.wait = true;
    let userCred: UserCredential
    userCred = {
      email: this.fc.email.value,
      password: this.fc.password.value
    }
    if(await this.userService.signIn(userCred)){
      this.wait = false;
      this.changeModal('none')
      if(this.userService.redirectUrl != ''){
        let url = this.userService.redirectUrl
        this.userService.redirectUrl = ''
        this.router.navigate([url])
      }
    } else {
      this.wait = false;
      this.error = 'Email ou senha inválido'
    }
  }

  cleanError() {
    this.error = ''
  }

  async googleLogin() {
    this.wait = true;
    if(await this.userService.googleSignIn()){
      this.wait = false;
      let phone = this.userService.getCurrentUser().phone;
      if(parseInt(phone) == 0)
        this.changeModal('profile')
      else
        this.changeModal('none')
      if(this.userService.redirectUrl != ''){
        let url = this.userService.redirectUrl
        this.userService.redirectUrl = ''
        this.router.navigate([url])
      }
    } else {
      this.wait = false;
      this.error = 'Login inválido'
    }
  }


}
