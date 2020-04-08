 const firebaseConfig = {
     apiKey: "AIzaSyBfA7sjfocZs37CrFd37pH3438XnniA7qo",
     authDomain: "telecovidcina.firebaseapp.com",
     databaseURL: "https://telecovidcina.firebaseio.com",
     projectId: "telecovidcina",
     storageBucket: "telecovidcina.appspot.com",
     messagingSenderId: "631562211191",
     appId: "1:631562211191:web:a03ad2843550217d1b1b72",
     measurementId: "G-C0F0WPJ2J2"
 };

 firebase.initializeApp(firebaseConfig);
 firebase.analytics();

 var name, phone, age, genre, birthYear,email,lat,long,level;

 function initMap() {
     var mapa = new google.maps.Map(document.getElementById('mapa'), {
         zoom: 10,
         center: { lat: -8.8368200, lng: 13.2343200 },
         mapTypeId: 'terrain'
     });
     var dados = getDados();
     mapa.data.addGeoJson(dados);
     mapa.data.setStyle((feature) => {
         var magnitude = feature.getProperty('mag');
         var cor = feature.getProperty('color');
         return {
             icon: getCircle(magnitude, cor)
         };
     });
 }


 //Função que vai carregar as coordenadas
 function getDados() {
     var geoJson = {
         "type": "FeatureCollection",
         "features": []
     };
     
     firebase.database().ref('/users/').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            geoJson["features"].push({
                "type": "Feature",
                "properties": {
                    "mag": "5",
                    "color": "yellow",
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        childSnapshot.child(childSnapshot.key).val().geo.lat,
                        childSnapshot.child(childSnapshot.key).val().geo.long
                    ]
                }
            });
        });
    });
     return geoJson;
 }




 function getCircle(magnitude, cor) {
     return {
         path: google.maps.SymbolPath.CIRCLE,
         fillColor: cor,
         fillOpacity: .2,
         scale: Math.pow(2, magnitude) / 2,
         strokeColor: 'white',
         strokeWeight: .5
     };
 }


 //  function getLocation() {
 //      if (navigator.geolocation) {
 //          navigator.geolocation.getCurrentPosition(showPosition);
 //      } else {
 //          x.innerHTML = "Geolocation is not supported by this browser.";
 //      }
 //  }


 function showPosition(position) {

     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
             firebase.database().ref('user/' + user.uid+"/geo").set({
                 lat: position.coords.latitude,
                 long: position.coords.longitude
             });
         } else {

             //Deve fazer iniciar sessão
         }
     });

 }


 //------------------------------------Inicio------------------------------------------------
 //---------------------------------Secção Utilizador--------------------------------------    
 //iniciar a Sessão

 
   function login(email, pass) {    
        return firebase.auth().signInWithEmailAndPassword(email, pass);
 }





 
 

 function googleLogin() {
     var provedor = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provedor);
 }


 // função para Registar Utilizador
 function logup(user) {
     
     firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(error => {
         var errorCode = error.code;
         return false;
     });

     firebase.auth().onAuthStateChanged(newUser => {
         if (newUser) {

             firebase.database().ref('users/' + newUser.uid).set({
                 name: user.name,
                 phone: user.phone,
                 email: user.email,
                 level: 0,
                 birthYear: '',
                 gender: '',
                 geo: {
                     lat: null,
                     long: null
                 }
             }).then(() => {
            
                 return true;
             });
         }
         return false;
     });
 }

 function googleLogup() {
     var provedor = new firebase.auth.GoogleAuthProvider();

     firebase.auth().signInWithPopup(provedor).then(result => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user){
            
                firebase.database().ref('users/' + user.uid).set({
                    name: user.displayName,
                    phone: '',
                    email: user.email,
                    level: 0,
                    birthYear: '',
                    gender: '',
                    geo: {
                        lat: null,
                        long: null
                    }
                }).then(() => {
               
                    return true;
                });
            }
        });
        
     }).catch(error => {
         return false;
     });



 }


 function actualizarDados(user) {
     
      return firebase.database().ref('users/' + user.uid).update({
         doc: user.doc,
         gender: user.gender,
         phone: user.phone,
         email: user.email,
         name: user.name,
         birthYear: user.birthYear,
         level: user.level,
         geo: {
             lat: user.lat,
             long: user.long
         }
     });
 }



 // Terminar a Sessão
 function logout() {
    return firebase.auth().signOut();
 }

 //Verifica se o utilizador está conectado
 function conectado() {
     //Verifica se o utilizador está conectado
     firebase.auth().onAuthStateChanged(function(user) {
         if (user){
            firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                setName(snapshot.val().name);
                setGenre(snapshot.val().genre);
                setPhone(snapshot.val().phone);
                setEmail(snapshot.val().email);
                setBirthYear(snapshot.val().birthYear);
                setLevel(snapshot.val().level);
               
                
              }).then(result=>{
           
              });
            return true;
         }
             

         return false;

     });
 }



 function ResetPassword(email) {

     firebase.auth().sendPasswordResetEmail(email).then(function() {
         // Feito
     }).catch(function(error) {
         // Erro
     });
 }



 //---------------------------------Secção Utilizador-------------------------------------- 
 //------------------------------------FIM---------------------------------------------------


 //---------------------------------------Inicio-------------------------------------------
 //--------------------------------------Dados utilizador ----------------------------------

 function getName() {
    return this.name;
}

function getPhone() {
    return this.phone;
}

function getGenre() {
    return this.genre;
}

function getEmail(){
   return this.email;
} 

function getLevel(){
   return this.level;
}

function getBirthYear(){
   return this.birthYear;
}

function getLat(){
   return this.lat;
}

function getLong(){
   return this.long;
}

function setName(name) {
    this.name = name;
}

function setPhone(phone) {
    this.phone = phone;
}

function setGenre(genre) {
    this.genre = genre;
}

function setBirthYear(birthYear) {
    this.birthYear = birthYear;
}

function setEmail(email){
    this.email=email;
}
function setLevel(level){
    this.level=level;
}

function setLat(lat){
    this.lat=lat;
}

function setLong(long){
   this.long=long;
}


 //--------------------------------------Dados Utilizador ------------------------------------
 //------------------------------------------FIM--------------------------------------------