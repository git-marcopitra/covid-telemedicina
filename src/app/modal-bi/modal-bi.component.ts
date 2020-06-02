import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal-bi',
  templateUrl: './modal-bi.component.html',
  styleUrls: ['./modal-bi.component.css','../modal/modal.component.css']
})
export class ModalBiComponent extends ModalComponent implements OnInit {
  formDoc = this.fb.group({
    doc: ['', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern('(([0-9]{9})+([A-Za-z]{2})+([0-9]{3}))')
    ])],
  })
  errorS: string;
  wait: boolean;
  fc: any;
  user: User;
  error = {
    doc: false
  }

  constructor(modalService: ModalService, private fb: FormBuilder, private userService: UserService) {
    super(modalService);
    this.wait = false;
    this.fc = this.formDoc.controls;
   }

  ngOnInit(): void {
  }

  checkError (event:any, status: boolean) {
    const key = event.srcElement.id;
    this.error[key] = status;
    if(status){
      this.errorS = 'Número de BI inválido';
    }
  }

  cleanError(event:any) {
    this.errorS = '';
    this.checkError(event, false);
  }

  async onSubmit() {
    this.wait = true;
    this.user = this.userService.getCurrentUser();
    this.user.doc = this.fc.doc.value;
    if(await this.userService.updateThisUser(this.user)){
      this.wait = false;
      this.changeModal('none');
    } else {
      this.wait = false;
      this.errorS = 'Erro inesperado, tente mais uma vez ou tente mais tarde';
    }
  }

}
