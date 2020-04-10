import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menu: boolean
  logged: boolean
  welcome: boolean
  constructor(private modalService: ModalService, private router: Router, private userService: UserService) {
    this.menu = false
    this.welcome = true
   }

  ngOnInit() {
  }

  ngDoCheck() {
    this.logged = this.userService.getState();
    if(this.logged === true && this.modalService.firstTime && this.welcome){
      this.welcome = false
      this.modalService.setModal('none')
    }
    else if(this.logged === false && this.modalService.firstTime && this.welcome) {
      this.welcome = false
      this.modalService.setModal('welcome')
    }
  }

  toggleMenu($active: boolean): void {
    this.menu = $active == this.menu ? this.menu : !this.menu
  }

  changeModal($modal: string): void {
    this.toggleMenu(false)
    this.modalService.setModal($modal)
  }

  routeTo($route: string): void {
    this.toggleMenu(false)
    this.router.navigate([$route])
  }
}
