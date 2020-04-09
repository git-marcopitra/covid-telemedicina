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
import { DailyTestComponent } from './daily-test/daily-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { TelemedicinaComponent } from './telemedicina/telemedicina.component';
import { TelemedicinaModule } from './telemedicina/telemedicina.module';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { ModalPasswordRescueComponent } from './modal-password-rescue/modal-password-rescue.component';

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
    DailyTestComponent,
    MapComponent,
    TelemedicinaComponent,
    ModalProfileComponent,
    ModalPasswordRescueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TelemedicinaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
