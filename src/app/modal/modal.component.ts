import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { User } from '../user';

@Component({ template: ''})
export class ModalComponent {

  error: {}

  currentModal: string
  constructor(private modalService: ModalService) { }

  ngDoCheck(): void{
    this.currentModal = this.modalService.getModal();
  }

  changeModal($modal: string): void {
    this.modalService.setModal($modal)
  }
  
  firstTime = (): boolean => this.modalService.getFirstTime();

  modals = (): string[] => this.modalService.getModals()

  endFirstTime(): void {
    this.modalService.noMoreFirstTime();
  }

  checkError (event:any, status: boolean) {
    const key = event.srcElement.id;
    console.log('Key :::: ', key, ' Status :::: ', status)
    this.error[key] = status;
  }

}
