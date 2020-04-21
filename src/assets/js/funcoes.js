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
 google.charts.load("visualization", "1", { 'packages': ['controls', 'corechart'] });
 google.charts.setOnLoadCallback(charts);

 firebase.initializeApp(firebaseConfig);
 firebase.analytics();


 var user = {};
 var geoJson = {
     "type": "FeatureCollection",
     "features": []
 };

 var dataPieChart;


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
 function logup($user) {
     firebase.auth().createUserWithEmailAndPassword($user.email, $user.password).catch(error => {
         var errorCode = error.code;
     });
     return firebase.auth().onAuthStateChanged(newUser => {
         if (newUser) {
             currentUser = {
                 name: $user.name,
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
                 displayName: $user.name,
             });
         }
     })
 }

 async function googleLogup() {
     var provedor = new firebase.auth.GoogleAuthProvider();
     await firebase.auth().signInWithPopup(provedor);
     return firebase.auth().onAuthStateChanged($user => {
         firebase.database().ref('users/' + $user.uid).once('value').then(userVer => {
             if (userVer.val() == null) {
                 currentUser = {
                     name: $user.displayName,
                     gender: '',
                     phone: ($user.phoneNumber === null) ? 0 : $user.phoneNumber,
                     email: $user.email,
                     birthYear: '',
                     level: -1,
                     doc: '',
                     geo: {
                         lat: 0,
                         long: 0
                     }
                 }
                 firebase.database().ref('users/' + $user.uid).set(currentUser);
                 currentUser["uid"] = $user.uid;
                 setUser(currentUser);
             }
         })
     });
 }

 function updateUser($user) {
     firebase.auth().onAuthStateChanged(user1 => {
         if (user1) {
             user1.updateProfile({
                 displayName: $user.name,
             });
         }
     });
     return firebase.database().ref('users/' + this.user.uid).update({
         doc: ($user.doc == null) ? '' : $user.doc,
         gender: $user.gender,
         phone: $user.phone,
         email: $user.email,
         name: $user.name,
         birthYear: $user.birthYear,
         level: $user.level,
         geo: $user.geo
     });
 }



 // Terminar a Sessão
 function logout() {
     this.user = {}
     return firebase.auth().signOut();
 }

 //Verifica se o utilizador está conectado

 function conectado() {
     return firebase.auth()
 }


 async function getAllDataUser() {
     await firebase.auth().onAuthStateChanged($user => {
         if ($user) {
             this.user["uid"] = $user.uid;
             firebase.database().ref('/users/' + this.user.uid).once('value').then(snapshot => {
                 currentUser = {
                     uid: $user.uid,
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
         if (snapshot.val().name !== null) {
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
         }
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

 function setConsulta($user, test,outro) {
     var date = new Date();

     return firebase.firestore().collection("consultas").add({
         test: test,
         user: $user,
         dateInit: date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear(),
         dateClose: '-/-/-',
         observador: '-',
         done: false,
         motivo: test.result < 35 ? "Sintomas leves" : test.result < 65 ? "Alguns sintomas" : "Avaliação sintomática alta",
         detalhes:outro
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

 function setUser($user) {
     this.user = $user
 }

 //------------------------------------------Estatistica----------------------------------------
 function statistic() {

     return firebase.database().ref('/users/');
 }


 var chartStatus = false;

 function charts() {
     chartStatus = false;
     firebase.database().ref('/users/').on('value', snapshot => {
         var kids = teenager = young = adult = 0;
         var female = male = 0;
         dataPieChart = {
             "baixo": 0,
             "medio": 0,
             "alto": 0
         };
         snapshot.forEach(childSnapshot => {
                 const userSnap = childSnapshot.val();
                 const level = userSnap.level < 35 ? "baixo" : userSnap.level < 65 ? "medio" : "alto";
                 const age = (new Date().getFullYear() - userSnap.birthYear);
                 if (userSnap.doc !== '') {
                     dataPieChart[level]++;
                     if (userSnap.gender == "F")
                         female++;
                     else
                         male++
                         age < 16 ? kids++ : age < 21 ? teenager++ : age < 65 ? young++ : adult++;
                 }

             })
             //resultado

         var chart = [];
         var data = [];
         var options = [];
         data.push(google.visualization.arrayToDataTable([
             ['Nivel', 'Valor'],
             ['Alto', dataPieChart.alto],
             ['Medio', dataPieChart.medio],
             ['Baixo', dataPieChart.baixo]
         ]));

         data.push(google.visualization.arrayToDataTable([
             ['Nivel', 'Valor', { role: "style" }],
             ['Até 15', kids, '#AAAAFF'],
             ['16 aos 20', teenager, '#7777FF'],
             ['21 aos 65', young, '#4444FF'],
             ['65 acima', adult, '#1111FF']
         ]));

         data.push(google.visualization.arrayToDataTable([
             ["Genero", "valor", { role: "style" }],
             ["Homens", male, "#5555FF"],
             ["Mulheres", female, "#ff5555"]
         ]));

         options.push({
             title: 'AVALIAÇÕES EM GERAL',
             colors: ['#ff4444', '#DDDD44', '#44ff44'],
             backgroundColor: '#E4E4E4',
             legend: 'Representação dos testes no Geral'
         });

         options.push({
             title: 'AVALIAÇÕES POR IDADES',
             colors: ['#ff0000', '#00ff00', '#0000ff'],
             backgroundColor: '#E4E4E4',
             legend: 'none'
         });

         options.push({
             title: 'AVALIAÇÕES POR GÊNERO',
             colors: ['#ff0000', '#00ff00', '#0000ff'],
             backgroundColor: '#E4E4E4',
             legend: 'none'
         });


         chartStatus = true;
         chart.push(new google.visualization.PieChart(document.getElementById('general')));
         chart.push(new google.visualization.ColumnChart(document.getElementById('age')));
         chart.push(new google.visualization.ColumnChart(document.getElementById('gender')));
         chart[0].draw(data[0], options[0]);
         chart[1].draw(data[1], options[1]);
         chart[2].draw(data[2], options[2]);
     });
 }

 function CreatePDF(user, test,details) {
     if(test==null){
        return false;
     }
     
     var date = new Date();
     var name = user.name;
     var age = date.getFullYear() - user.birthYear;
     var phone = user.phone;
     var email = user.email;
     var result = test.result.toFixed(3);
     var data = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();


     var sintomas = "";
     sintomas += test.febre ? "<li style=' list-style: none;margin-left: -22px;'>Febre</li>" : "";
     sintomas += test.tosse ? "<li style=' list-style: none;margin-left: -22px;'>Tosse</li>" : "";
     sintomas += test.fadiga ? "<li style=' list-style: none;margin-left: -22px;'>Fadiga</li>" : "";
     sintomas += test.respiracao ? "<li style=' list-style: none;margin-left: -22px;'>Dificuldade de respirar</li>" : "";
     sintomas += test.garganta ? "<li style=' list-style: none;margin-left: -22px;'>Dor de garganta</li>" : "";
     sintomas += test.calafrios ? "<li style=' list-style: none;margin-left: -22px;'>Calafrios</li>" : "";
     sintomas += test.corpo ? "<li style=' list-style: none;margin-left: -22px;'>Dor no Corpo</li>" : "";
     sintomas += test.cabeca ? "<li style=' list-style: none;margin-left: -22px;'>Dor de cabeça</li>" : "";
     sintomas += test.coriza ? "<li style=' list-style: none;margin-left: -22px;'>Nariz escorrendo (Coriza)</li>" : "";
     sintomas += test.espirros ? "<li style=' list-style: none;margin-left: -22px;'> Espirros</li>" : "";

     var questoes = "";
     questoes += test.travel ? "<li style=' list-style: none;margin-left: -22px;'>Viajou para países em actual estado de emergência no último mês de Março?</li><li style=' list-style: none;margin-left:-22px;'><b>Sim</b></li> " : "";

     questoes += test.people ? "<li style=' list-style: none;margin-left: -22px;'>Esteve em lugares com mais de 50 pessoas nos últimos 14 dias?</li><li style=' list-style: none;margin-left:-22px;'><b>Sim</b></li> " : "";

     questoes += test.covid ? "<li style=' list-style: none;margin-left: -22px;'>Esteve em contacto com pessoas infectadas com o COVID-19?</li><li style=' list-style: none;margin-left:-22px;'><b>Sim</b></li> " : "";

     questoes += details.preSick!='' ? "<li style=' list-style: none;margin-left: -22px;'>Alguma doença pré-existe?</li><li style=' list-style: none;margin-left:-22px;'><b>"+details.preSick+"</b></li> " : "";

     questoes += details.comment!='' ? "<li style=' list-style: none;margin-left: -22px;'>Informação Adicional</li><li style=' list-style: none;margin-left:-22px;'><b>"+details.comment+"</b></li> " : "";

     var k = document.createElement("div");
     k.setAttribute("id", "teste");

     k.style = "height: 1118px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';line-height: 1.5;width: 800px;"
     k.innerHTML = "<nav  style='background-color: #f8f9fa !important;position: relative; display: flex;flex-wrap: wrap;align-items: center;justify-content: space-between;padding: 0.5rem 1rem;'><a  style='margin-left: 2%;display: flex;align-items: flex-end;    text-decoration: none; background-color: transparent;text-decoration:none; color: inherit; padding-top: 0.3125rem;padding-bottom: 0.3125rem;margin-right: 1rem;font-size: 1.25rem;line-height: inherit;white-space: nowrap;'>  <img src='data:image/png;base64,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' alt=''  height='60' class='d-inline-block align-top'  /><p  style='margin-bottom: 1rem; text-transform: uppercase;color: #B44;'><strong style='color: #28A745;'>Covid</strong>Ang </p></a><div style='position: absolute;right: 60px; top: 40px;'><form><p>" + data + "</p></form></div></nav><h4 style='margin-left: 31%;margin-top: 2%;font-size: 1.5rem;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;'>Dados do paciente</h4><hr style='margin-top: 6px; margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);'><ul style='margin-left: 3%;    margin-top: 0;margin-bottom: 1rem;'><li style='list-style: none;'>Nome: " + name + " </li><li style='list-style: none;'>Idade: " + age + "</li><li style='list-style: none;'>Email: " + email + "</li><li style='list-style: none;'>Telefone: " + phone + "</li></ul><h4 style='margin-left: 37%;margin-top: 2%;font-size: 1.5rem;margin-bottom: 0.5rem;font-weight: 500;line-height: 1.2;'>Avaliação</h4><hr style='margin-top: 6px; margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);'><ul style='margin-left: 3%; margin-top: 0;margin-bottom: 1rem;'><li style='list-style: none;'>Resultado da avaliação: <b>" + result + "%</b></li></ul><br><div style='display: flex;'><div style='display: inline;  margin-left: 7%;width: 263px;'><h5 style='text-align: center;margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2;font-size: 1.25rem;'>Sintomas</h5><hr style='margin-top: 1rem;margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);'><ul style='margin-left: 10%;'>" + sintomas + "</ul></div><div style='display: inline;  width: 280px; margin-left: 10%;'><h5 style='text-align: center;margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2;font-size: 1.25rem;'>Questões</h5><hr style='margin-top: 1rem;margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);'><ul style='margin-left: 10%;'>" + questoes + "</ul></div></div><nav  style='bottom: 0;  top: 2165px;width: 800px;height: 87px;background-color: #f8f9fa !important;position: absolute; display: flex;flex-wrap: wrap;align-items: center;justify-content: space-between;padding: 0.5rem 1rem;'><a style='margin-left: 2%;margin-left: 2%;display: flex;align-items: flex-end;    text-decoration: none;background-color: transparent;text-decoration: none; color: inherit;padding-top: 0.3125rem;padding-bottom: 0.3125rem;margin-right: 1rem;font-size: 1.25rem;line-height: inherit;white-space: nowrap;'><img src='data:image/png;base64,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' alt=''  height='60' class='d-inline-block align-top'  /><p  style='margin-bottom: 1rem; text-transform: uppercase;color: #B44;'><strong style='color: #28A745;'>Covid</strong>Ang </p></a><div style='position: absolute;right: 200px; top: 40px;'><strong style='position: absolute;top: -21px;'>Contacto</strong><br><p style='top: 8px; position: absolute;'>covidango@gmail.com</p></div></nav>"
     document.getElementsByTagName("body")[0].appendChild(k);
     html2canvas(document.getElementById('teste'), {
             onrendered: function(canvas) {
                 document.getElementsByTagName("body")[0].removeChild(k);
                 var img = canvas.toDataURL('image/png');
                 var doc = new jsPDF();
                 doc.addImage(img, 'JPEG', 0, 0);
                 doc.save('Ficha médica.pdf');
             }
         })
        
 }