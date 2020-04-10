import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { ModalService } from '../modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private modalService: ModalService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url = state.url
      return this.checkLogin(url)
  }
  checkLogin(url: string) {
    if(this.userService.getState())
      return true
    this.userService.redirectUrl = url;
    this.modalService.setModal('sign-in');
    this.router.navigate(['/home']);
    return false
  }
}
