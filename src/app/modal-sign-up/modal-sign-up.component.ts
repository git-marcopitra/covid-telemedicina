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
    name: ['', Validators.required],
    id: ['', Validators.required],
    phone: ['', Validators.required],
    age: [null, Validators.required],
    password: ['', Validators.required]
  })

  fc: any

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService) { 
    super(modalService)
    this.fc = this.signupForm.controls
  }
  
  ngOnInit(): void {
  }  

  onSubmit(): void {
    let user: User
    user = {
      name: this.fc.name.value,
      id: this.fc.id.value,
      phone: this.fc.phone.value,
      birthYear: ((new Date().getFullYear()) -this.fc.age.value).toString(),
      password: this.fc.password.value
    }
    /*this.userService.insert(user)*/
  }

}
