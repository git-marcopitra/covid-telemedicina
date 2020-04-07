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

 var name, bi, phone, age, genre, address;


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
     /*    geoJson["features"].push({
         "type": "Feature",
         "properties": {
             "mag": "5",
             "color": "yellow",
         },
         "geometry": {
             "type": "Point",
             "coordinates": [-8.8368200, 13.2343200]
         }
     });
*/
     firebase.database().ref('/user/').once('value').then(snapshot => {
         // Adicionar dados
         // add dados vindos do firebase no campo "coordinates" do dicionario
         geoJson["features"].push({
             "type": "Feature",
             "properties": {
                 "mag": "5",
                 "color": "yellow",
             },
             "geometry": {
                 "type": "Point",
                 "coordinates": [
                     snapshot.val().geo.lat,
                     snapshot.val().geo.long
                 ]
             }
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
             firebase.database().ref('user/' + user.uid).set({
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
     firebase.auth().signInWithEmailAndPassword(email, pass)
         .then(result => {
             //fixe
         }).catch(error => {
             //erro
         });
 }

 function googleLogin() {
     var provedor = new firebase.auth.GoogleAuthProvider();
     firebase.auth().signInWithPopup(provedor).then(result => {
         true
     }).catch(error => {
         false
     });
 }


 // função para Registar Utilizador
 function logup(user) {
     firebase.auth().createUserWithEmailAndPassword(email, senha).catch(error => {
         var errorCode = error.code;
         return false;
     });

     firebase.auth().onAuthStateChanged(newUser => {
         if (newUser) {
             firebase.database().ref('user/' + newUser.uid).set({
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
                 newUser.updateProfile({
                     displayName: nome
                 });
                 return true
             });
         }
         return false
     });
 }

 function googleLogup() {
     var provedor = new firebase.auth.GoogleAuthProvider();

     firebase.auth().signInWithPopup(provedor).then(result => {
         return true
     }).catch(error => {
         return false
     });

 }


 function actualizarDados(user) {
     firebase.database().ref('user/' + user.uid).update({
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
     }).then(function() {
         // concluido
     });
 }



 // Terminar a Sessão
 function logout() {
     firebase.auth().signOut().then(() => {
         return true;
     }).catch(error => {
         return false
     });
 }

 //Verifica se o utilizador está conectado
 function conectado() {
     //Verifica se o utilizador está conectado
     firebase.auth().onAuthStateChanged(function(user) {
         if (user)
             return true;

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

 function getBi() {
     return this.bi;
 }

 function getPhone() {
     return this.phone;
 }

 function getGenre() {
     return this.genre;
 }

 function getAddress() {
     return this.address;
 }

 function setName(name) {
     this.name = name;
 }

 function setBi(bi) {
     this.bi = bi;
 }

 function setPhone(phone) {
     this.phone = phone;
 }

 function setGenre(genre) {
     this.genre = genre;
 }

 function setAddress(address) {
     this.address = address;
 }

 //--------------------------------------Dados Utilizador ------------------------------------
 //------------------------------------------FIM--------------------------------------------