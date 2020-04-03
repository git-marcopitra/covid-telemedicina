import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ModalsComponent } from './modals/modals.component';
import { ModalComponent } from './modal/modal.component';
import { ModalWelcomeComponent } from './modal-welcome/modal-welcome.component';
import { ModalSignInComponent } from './modal-sign-in/modal-sign-in.component';
import { ModalSignUpComponent } from './modal-sign-up/modal-sign-up.component';
import { ModalAccountSettingsComponent } from './modal-account-settings/modal-account-settings.component';
import { HeaderComponent } from './header/header.component';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamComponent,
    ContributorsComponent,
    AboutusComponent,
    ModalsComponent,
    ModalComponent,
    ModalWelcomeComponent,
    ModalSignInComponent,
    ModalSignUpComponent,
    ModalAccountSettingsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
