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
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { DailyTestComponent } from './daily-test/daily-test.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    HeaderComponent,
    DailyTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
