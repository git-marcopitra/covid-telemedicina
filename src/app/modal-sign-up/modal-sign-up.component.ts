import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms'
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-sign-up',
  templateUrl: './modal-sign-up.component.html',
  styleUrls: ['./modal-sign-up.component.css', '../modal/modal.component.css']
})
export class ModalSignUpComponent extends ModalComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.minLength(2),
      Validators.required
    ])],
    email: ['', Validators.compose([
      Validators.email,
      Validators.required
    ])],
    phone: ['', Validators.compose([
      Validators.minLength(9),
      Validators.required
    ])],
    password: ['', Validators.compose([
      Validators.minLength(8),
      Validators.required
    ])]
  })

  error = {
    name: false,
    email: false,
    phone: false,
    password: false
  }

  googleSignUpForm = this.fb.group({})

  google: boolean
  wait: boolean
  fc: any
  errorS: string

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService, private router: Router) { 
    super(modalService)
    this.fc = this.signupForm.controls
    this.google = true
    this.wait = false
    this.errorS = ''
  }
  
  ngOnInit(): void {
  }  

  cleanError(event:any) {
    this.errorS = ''
    this.checkError(event, false)
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
      if(this.userService.redirectUrl != ''){
        let url = this.userService.redirectUrl
        this.userService.redirectUrl = ''
        this.router.navigate([url])
      }
    }
    else{
      this.wait = false
      this.errorS = "Erro ao cadastrar"
    }
  }

  async googleSignUp() {
    this.wait = true
    if(await this.userService.googleSignUp()){
      this.wait = false
      let level = this.userService.getCurrentUser().level;
      if(parseInt(level) == -1)
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
