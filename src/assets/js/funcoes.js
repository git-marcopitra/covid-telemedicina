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
 google.charts.load('current', { 'packages': ['corechart'] });
 google.charts.setOnLoadCallback(charts);

 var user = {};
 var geoJson = {
     "type": "FeatureCollection",
     "features": []
 };


 async function initMap() {
     var mapa = new google.maps.Map(document.getElementById('mapa'), {
         zoom: 10,
         center: { lat: -8.8368200, lng: 13.2343200 },
         mapTypeId: 'terrain',
         minZoom: 10,
         maxZoom: 13
     });
     firebase.database().ref('/users/').on('value', snapshot => {
         snapshot.forEach(childSnapshot => {
             let user = childSnapshot.val()

             if (user.geo)
                 if (user.geo.lat !== 0 && user.geo.long !== 0) {
                     geoJson["features"].push({
                         "type": "Feature",
                         "properties": {
                             "mag": "4",
                             "color": user.level < 35 ? "green" : user.level < 65 ? "yellow" : "red",
                         },
                         "geometry": {
                             "type": "Point",
                             "coordinates": [
                                 user.geo.long,
                                 user.geo.lat
                             ]
                         }
                     });
                 }
         });

         mapa.data.addGeoJson(geoJson);

         mapa.data.setStyle((feature) => {
             var magnitude = feature.getProperty('mag');
             var cor = feature.getProperty('color');
             return {
                 icon: getCircle(magnitude, cor)
             };
         });
     });

 }


 //Função que vai carregar as coordenadas
 function getGeoData() {

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
             firebase.database().ref('user/' + user.uid + "/geo").set({
                 lat: position.coords.latitude,
                 long: position.coords.longitude
             });
         } else {

             //Deve fazer iniciar sessão
         }
     });

 }


 //---------------------------------Secção Utilizador--------------------------------------    
 //iniciar a Sessão


 function login(email, pass) {
     return firebase.auth().signInWithEmailAndPassword(email, pass);
 }

 // função para Registar Utilizador
 function logup(user) {

     firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(error => {
         var errorCode = error.code;
     });

     return firebase.auth().onAuthStateChanged(newUser => {
         if (newUser) {
             currentUser = {
                 name: user.name,
                 gender: '',
                 phone: (newUser.phoneNumber === null) ? 0 : newUser.numberPhone,
                 email: newUser.email,
                 birthYear: '',
                 level: 0,
                 doc: '',
                 geo: {
                     lat: 0,
                     long: 0
                 }
             }
             firebase.database().ref('users/' + newUser.uid).set(currentUser);
             currentUser["uid"] = newUser.uid;
             setUser(currentUser);
             newUser.updateProfile({
                 displayName: user.name,
             });
         }
     })
 }
 async function googleLogin() {
     var provedor = new firebase.auth.GoogleAuthProvider();
     await firebase.auth().signInWithPopup(provedor)
     return firebase.auth().onAuthStateChanged(user => {
         let userVer = firebase.database().ref('users/' + user.uid)
         if (!(userVer.val().name.length > 0)) {
             currentUser = {
                 name: user.displayName,
                 gender: '',
                 phone: (user.phoneNumber === null) ? 0 : user.numberPhone,
                 email: user.email,
                 birthYear: '',
                 level: 0,
                 doc: '',
                 geo: {
                     lat: 0,
                     long: 0
                 }
             }
             firebase.database().ref('users/' + user.uid).set(currentUser);
             currentUser["uid"] = user.uid;
             setUser(currentUser);
         }
     });
 }


 function updateUser(user) {
     firebase.auth().onAuthStateChanged(user1 => {
         if (user1) {
             user1.updateProfile({
                 displayName: user.name,
             });
         }
     });


     return firebase.database().ref('users/' + this.user.uid).update({
         doc: (user.doc == null) ? '' : user.doc,
         gender: user.gender,
         phone: user.phone,
         email: user.email,
         name: user.name,
         birthYear: user.birthYear,
         level: user.level,
         geo: user.geo
     });
 }



 // Terminar a Sessão
 function logout() {
     return firebase.auth().signOut();
 }

 //Verifica se o utilizador está conectado

 function conectado() {
     return firebase.auth()
 }


 function getAllDataUser() {
     firebase.auth().onAuthStateChanged(user => {
         if (user) {
             this.user["uid"] = user.uid;
             firebase.database().ref('/users/' + this.user.uid).once('value').then(snapshot => {
                 currentUser = {
                     uid: user.uid,
                     name: snapshot.val().name,
                     gender: snapshot.val().gender,
                     phone: snapshot.val().phone,
                     email: snapshot.val().email,
                     doc: snapshot.val().doc,
                     birthYear: snapshot.val().birthYear,
                     level: snapshot.val().level,
                     geo: snapshot.val().geo
                 }
                 setUser(currentUser);
             }).catch(error => {
                 console.log(error);
             });
         }
     });
 }

 function getDataUser(uid) {
     firebase.database().ref('/users/' + uid).once('value').then(snapshot => {
         currentUser = {
             uid: uid,
             name: snapshot.val().name,
             gender: snapshot.val().gender,
             phone: snapshot.val().phone,
             email: snapshot.val().email,
             doc: snapshot.val().doc,
             birthYear: snapshot.val().birthYear,
             level: snapshot.val().level,
             geo: snapshot.val().geo
         }
         setUser(currentUser);
     }).catch(error => {
         console.log(error);
     });
 }


 function resetPassword(email) {
     return firebase.auth().sendPasswordResetEmail(email)
 }

 function changePassword(password) {
     firebase.auth().currentUser.updatePassword(password).then(result => {

     }).catch(error => {

     });
 }

 function setConsulta(test, user) {
     var date = new Date();

     return firebase.firestore().collection("consultas").add({
         test: test,
         user: user,
         year: date.getFullYear(),
         month: date.getMonth(),
         day: date.getDay(),
         hour: date.getHours(),
         minute: date.getMinutes()
     });

 }

 function getConsulta(uid) {

     return firebase.firestore().collection("consultas").where("user.uid", "==", uid).get();

 }

 function cancelarConsulta(uid) {
     firebase.firestore().collection("consultas")
         .where('user.uid', '==', uid).get().then(function(querySnapshot) {
             querySnapshot.forEach(function(doc) {
                 firebase.firestore().collection("consultas").doc(doc.id).delete().then(function() {}).catch(function(error) {});
             });
         });
 }
 //--------------------------------------Dados utilizador ----------------------------------
 function getUser() {
     return this.user
 }

 function setUser(user) {
     this.user = user
 }

 //------------------------------------------Estatistica----------------------------------------
 var chartStatus = false;

 function charts() {
     chartStatus = false;
     firebase.database().ref('/users/').on('value', snapshot => {
         var kids = teenager = young = adult = 0;
         var female = male = 0;
         var dataPieChart = {
             "baixo": 0,
             "medio": 0,
             "alto": 0
         }
         snapshot.forEach(childSnapshot => {
                 var user = childSnapshot.val();
                 var level = user.level < 35 ? "baixo" : user.level < 65 ? "medio" : "alto";


                 if (user.doc !== '') {
                     dataPieChart[level]++;
                     if (level == "alto") {
                         if (user.gender == "F")
                             female++;
                         else
                             male++
                             user.birthYear < 16 ? kids++ : user.birthYear < 21 ? teenager++ : user.birthYear < 65 ? young++ : adult++;

                     }

                 }
             })
             //resultado
         var data = [];
         var options = [];

         data.push(google.visualization.arrayToDataTable([
             ['Nivel', 'Valor'],
             ['Alto', dataPieChart.alto],
             ['Medio', dataPieChart.medio],
             ['Baixo', dataPieChart.baixo]
         ]));

         data.push(google.visualization.arrayToDataTable([
             ['Nivel', 'Valor'],
             ['Até 15', kids],
             ['16 aos 20', teenager],
             ['21 aos 65', young],
             ['65 acima', adult]
         ]));

         data.push(google.visualization.arrayToDataTable([
             ["Genero", "valor", { role: "style" }],
             ["M", male, "#4444ff"],
             ["F", female, "#ff4444"],
         ]));

         options.push({
             title: 'Geral',
             colors: ['#ff4444', '#ffff44', '#44ff44'],
             backgroundColor: '#E4E4E4',
             legend: 'Representação dos testes no Geral'
         });

         options.push({
             title: 'Idades',
             colors: ['#ff0000', '#00ff00', '#0000ff'],
             backgroundColor: '#E4E4E4',
             legend: 'Representação dos testes por Idades'
         });

         options.push({
             title: 'Gênero',
             colors: ['#ff0000', '#00ff00', '#0000ff'],
             backgroundColor: '#E4E4E4',
             legend: 'Representação dos testes por gênero'
         });

         var chart = [];
         chartStatus = true;
         chart.push(new google.visualization.PieChart(document.getElementById('general')));
         chart.push(new google.visualization.ColumnChart(document.getElementById('age')));
         chart.push(new google.visualization.ColumnChart(document.getElementById('gender')));
         chart[0].draw(data[0], options[0]);
         chart[1].draw(data[1], options[1]);
         chart[2].draw(data[2], options[2]);
     });
 }


 function statistic() {
     pieChart();
     return firebase.database().ref('/users/');

 }