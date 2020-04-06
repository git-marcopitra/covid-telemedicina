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
         zoom: 2,
         center: { lat: -33.865427, lng: 151.196123 },
         mapTypeId: 'terrain'
     });
     var dados = getDados();
     mapa.data.addGeoJson(dados);
     mapa.data.setStyle(
         function(feature) {
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

     firebase.database().ref('/users/').once('value').then(function(snapshot) {
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
                     snapshot.val().lat,
                     snapshot.val().long
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


 function getLocation() {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition);
     } else {
         x.innerHTML = "Geolocation is not supported by this browser.";
     }
 }


 function showPosition(position) {

     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {

             firebase.database().ref('utilizador/' + user.uid).set({
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
 function iniciarSessao() {

     if (tipo == 'formulario') {

         var email = document.getElementById("email").value;
         var senha = document.getElementById("senha").value;
         firebase.auth().signInWithEmailAndPassword(email, senha)
             .then(function() {
                 //fixe
             }).catch(function(error) {
                 //erro
             });

     } else {
         var provedor = new firebase.auth.GoogleAuthProvider();

         firebase.auth().signInWithPopup(provedor).then(function(result) {
             //Fixe
         }).catch(function(error) {
             //Erro
         });
     }
 }



 // função para Registar Utilizador
 function registar(tipo) {

     if (tipo == 'formulario') {
         var nome = document.getElementById("nome").value;
         var email = document.getElementById("email").value;
         var senha = document.getElementById("senha").value;
         var bi = document.getElementById("bi").value;
         var sexo = document.getElementById("sexo").value;
         var telefone = document.getElementById("telefone").value;
         var endereco = document.getElementById("endereco").value;



         firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
         });

         firebase.auth().onAuthStateChanged(function(user) {
             if (user) {

                 firebase.database().ref('utilizador/' + user.uid).set({
                     bi: bi,
                     sexo: sexo,
                     telefone: telefone,
                     percentagem: 0,
                     endereco: endereco
                 }).then(function() {
                     user.updateProfile({
                         displayName: nome
                     });
                 });


             }
         });

     } else {
         var provedor = new firebase.auth.GoogleAuthProvider();

         firebase.auth().signInWithPopup(provedor).then(function(result) {
             //Fixe
         }).catch(function(error) {
             //Erro
         });

     }

 }

 function actualizarDados() {
     var bi = document.getElementById("bi").value;
     var sexo = document.getElementById("sexo").value;
     var telefone = document.getElementById("telefone").value;
     var endereco = document.getElementById("endereco").value;
     firebase.database().ref('utilizador/' + user.uid).update({
         bi: bi,
         sexo: sexo,
         telefone: telefone,
         endereco: endereco
     }).then(function() {
         // concluido
     });
 }



 // Terminar a Sessão
 function terminarSessao() {
     firebase.auth().signOut().then(function() {
         //fixe
     }).catch(function(error) {
         //erro
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