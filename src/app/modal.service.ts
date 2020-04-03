import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  currentModal: string
  firstTime: boolean
  modals = ['sign-in', 'sign-up', 'welcome', 'account-settings']


  constructor() { 
    this.firstTime = true
   }

  getModal(): string {
    return this.currentModal
  }

  setModal($modal: string): void {
    console.log("Eu era ::: ", this.currentModal)
    this.currentModal = $modal;
    console.log('Agora sou ::: ', this.currentModal)
  }
  
  getFirstTime(): boolean {
    return this.firstTime
  }

  
  getModals(): string[] {
    return this.modals
  }
  noMoreFirstTime(): void {
    this.firstTime = true;
  }

}
