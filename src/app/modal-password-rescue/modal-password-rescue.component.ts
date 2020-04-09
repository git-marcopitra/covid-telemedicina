import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal-password-rescue',
  templateUrl: './modal-password-rescue.component.html',
  styleUrls: ['./modal-password-rescue.component.css', '../modal/modal.component.css']
})
export class ModalPasswordRescueComponent extends ModalComponent implements OnInit {

  rescueForm = this.fb.group({
    email: ['', Validators.compose([Validators.email, Validators.required]) ]
  })
  fc: any
  wait: boolean;
  phase: number;
  error: string;

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService) {
    super(modalService)
    this.fc = this.rescueForm.controls
    this.wait = false
    this.phase = 1
   }

  ngOnInit(): void {
  }

  clearError(){
    this.error = ''
  }

  onSubmit() {
    this.wait = true
    if(this.userService.passwordRescue(this.fc.email.value)){
      this.wait = false
      this.phase++
    }
    else{
      this.wait = false
      this.error = "Ocorreu algum erro tente noutra altura"
    }
  }

}
