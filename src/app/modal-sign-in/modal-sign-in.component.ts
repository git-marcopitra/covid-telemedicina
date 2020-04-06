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
    id: ['', Validators.required],
    password: ['', Validators.required]
  })
  signinErrors = {
    id: 'Insira um número de identificação válido',
    password: 'Insira a sua palavra-passe'
  }
  fc: any
  users: any[]

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService) { 
    super(modalService)
    this.fc = this.signinForm.controls
    /*this.userService.getAll().subscribe(doc => {
      if(doc){
        this.users = doc
      }
    })*/
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    let userCred: UserCredential
    userCred = {
      id: this.fc.id.value,
      password: this.fc.password.value
    }
    /*console.log(this.userService.login(userCred))*/
  }

}
