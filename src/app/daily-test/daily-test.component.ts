import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-daily-test',
  templateUrl: './daily-test.component.html',
  styleUrls: ['./daily-test.component.css']
})
export class DailyTestComponent implements OnInit {

  phase: number
  level: number 
  
  testForm = this.fb.group({
    gender: ['', Validators.required],
    age: [null, Validators.required],
    docId: ['', Validators.required],
    travel: [false],
    people: [false],
    covid: [false],
    febre: [false],
    tosse: [false],
    fadiga: [false],
    respiracao: [false],
    garganta: [false],
    calafrios: [false],
    corpo: [false],
    cabeca: [false],
    coriza: [false],
    espirros: [false]
  })

  geoLocation: {
    lat: number,
    long: number
  }
  user: User
  fc: any
  wait: boolean;

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.phase = 0
    this.fc = this.testForm.controls
    this.wait = false
  }

  ngOnInit(): void {
    if(this.user.doc !== ''){
      this.phase = 2
    }
  }

  ngDoCheck(): void {
  }

  nextPhase(): void {
    this.phase++
  }
  
  firstPhase() {
    this.nextPhase()
    this.findMe()
  }

  prevPhase(): void {
    this.phase--
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setPosition(position);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setPosition(position: any) {
    this.geoLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    }
  }
  async onSubmit() {
    this.nextPhase()
    this.wait = true
    

    let travel = this.fc.travel.value ? 5 : 0
    let people = this.fc.people.value ? 5 : 0
    let covid = this.fc.covid.value ? 10 : 0
    let febre = this.fc.febre.value ? 13.12 : 0
    let tosse = this.fc.tosse.value ? 13.12 : 0 
    let fadiga = this.fc.fadiga.value ? 13.12 : 0
    let respiracao = this.fc.respiracao.value ? 6.56 : 0
    let garganta = this.fc.garganta.value ? 6.56 : 0
    let calafrios = this.fc.calafrios.value ? 6.56 : 0
    let corpo = this.fc.corpo.value ? 6.56 : 0
    let cabeca = this.fc.cabeca.value ? 6.56 : 0
    let coriza = this.fc.coriza.value ? 3.93 : 0
    let espirros = this.fc.espirros.value ? 3.91 : 0
    
    let level = travel + 
                people + 
                covid + 
                febre + 
                tosse + 
                fadiga + 
                respiracao + 
                garganta + 
                calafrios + 
                corpo + 
                cabeca + 
                coriza + 
                espirros

    this.level = level

    let user: User
    
    this.user = this.userService.getCurrentUser()
    console.log(this.user)
    user = {
      uid: this.user.uid,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      level: level,
      doc: this.fc.docId.value,
      gender: this.fc.gender.value,
      birthYear: ((new Date().getFullYear()) - (this.fc.age.value)).toString(),
      geo: this.geoLocation
    }
    
    if(await this.userService.updateThisUser(user)){
      this.wait = false
    } else {
      this.wait = false
    }
  }
}
