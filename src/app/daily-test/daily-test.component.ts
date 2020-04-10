import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
 declare function getConsulta(user: any): any;

@Component({
  selector: 'app-daily-test',
  templateUrl: './daily-test.component.html',
  styleUrls: ['./daily-test.component.css']
})
export class DailyTestComponent implements OnInit {
  checkPhase: boolean
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
    this.checkPhase = false
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(!this.checkPhase){
      this.user = this.userService.getCurrentUser()
      if(this.user !== undefined){
        this.checkPhase = true
        if(this.user.doc !== ''){
          this.phase = 2
        }
      }
    }
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
    
    user = {
      uid: this.user.uid,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      level: level,
      doc: this.user.doc !== '' ? this.user.doc : this.fc.docId.value,
      gender: this.user.gender !== '' ? this.user.gender : this.fc.gender.value,
      birthYear: this.user.birthYear !== '' ? this.user.birthYear : (this.fc.age.value).toString(),
      geo: this.user.geo.lat !== 0 ? this.user.geo : this.geoLocation
    }
    let test={
    travel: this.fc.travel.value, 
     people: this.fc.people.value, 
     covid: this.fc.covid.value,
     febre: this.fc.febre.value,
     tosse: this.fc.tosse.value, 
     fadiga: this.fc.fadiga.value, 
     respiracao: this.fc.respiracao.value, 
     garganta: this.fc.garganta.value,
     calafrios: this.fc.calafrios.value,
     corpo: this.fc.corpo.value, 
     cabeca: this.fc.cabeca.value, 
     coriza: this.fc.coriza.value, 
     espirros: this.fc.espirros.value
    }

    /*
    await getConsulta(user.uid).then((querySnapshot) => {
      if(querySnapshot.size==0){
          console.log("nao tem consulta")
      }else{
       querySnapshot.forEach((doc) => { 
        console.log("tem consulta")

       } 
       );
      }
   });
-----------------------------------------------------
       if(level>=65)
    setConsulta(test,user)
   ------------------------------------------------------------------ 
     var regexp = new RegExp('\^([0-9]{9})+([A-Za-z]{2})+([0-9]{3})$');
    
    */

    if(await this.userService.updateThisUser(user)){
   
      this.wait = false
    } else {
      this.wait = false
    }
  }
}
