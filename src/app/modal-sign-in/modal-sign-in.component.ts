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
    email: ['', Validators.compose([
      Validators.email,
      Validators.required
    ])],
    password: ['', Validators.compose([
      Validators.minLength(8),
      Validators.required
    ])]
  })
  error = {
    email: false,
    password: false
  }
  googleSigninForm = this.fb.group({})

  fc: any
  users: any[]
  google: boolean
  errorS: string
  wait: boolean

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService, private router: Router) { 
    super(modalService)
    this.fc = this.signinForm.controls
    this.google = true
    this.errorS = ''
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
      this.errorS = 'Email ou senha inválido'
    }
  }

  cleanError(event:any) {
    this.errorS = ''
    this.checkError(event, false)
  }

  async googleLogin() {
    this.wait = true
    if(await this.userService.googleSignUp()){
      this.wait = false
      let level = this.userService.getCurrentUser().level;
      if(level == -1)
        this.changeModal('profile')
      else
        this.changeModal('none')
      if(this.userService.redirectUrl != ''){
        let url = this.userService.redirectUrl
        this.userService.redirectUrl = ''
        this.router.navigate([url])
      }
    }
    else{
      this.wait = false
      this.errorS = "Erro ao cadastrar tente manualmente"
    }
  }


}
