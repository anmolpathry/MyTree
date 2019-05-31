import { Component, transition } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { AgregarPage } from '../agregar/agregar';  

import {Camera, CameraOptions} from '@ionic-native/camera';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  agregarPage = AgregarPage;
  loginPage = LoginPage;

 user: firebase.User;
 db : firebase.firestore.Firestore;

 items= [];

  constructor(public navCtrl: NavController, public camera: Camera,
    public toastCtrl: ToastController) {
    this.db = firebase.firestore();
    this.user = firebase.auth().currentUser;

    this.db.collection('arboles')
    .onSnapshot(query => {
      this.items = [];
      query.forEach(imagen =>{
        if (imagen.data().user == this.user.uid){
          this.items.push(imagen.data());
        }
      });
    });
  }

  //  ionViewDidEnter(){
  //    this.items= [];
  //    this.getDocuments('arboles');
  //  }

  getDocuments(collection:string){
    this.db.collection(collection).get()
    .then((res: any) => {
      res.forEach(element => {
        let arbol = {
          id: element.id,
          url: element.data().url,
          copa: element.data().copa,
          latitud: element.data().latitud,
          altitud: element.data().altitud,
          tipo: element.data().tipo,
          tronco: element.data().tronco,
        };
        this.items.push(arbol);
      });
    })
    .catch(error => {
      console.log('error al conectar a firestore');
    });
}


getPicture(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  this.camera.getPicture(options)
  .then(imagen => {
    this.navCtrl.push(this.agregarPage, {imagen: 'data:image/jpeg;base64,' + imagen});

  }, error => {
    console.log(JSON.stringify(error));
  });
}

logout(){
  firebase.auth().signOut()
  .then(data=>{
    const toast = this.toastCtrl.create({
      message: "Se cerró sesión correctamente",
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.navCtrl.setRoot(this.loginPage);
  })
  .catch(error => {
    const toast = this.toastCtrl.create({
      message: "Intente cerrar sesión más tarde",
      duration: 3000,
      position: 'top'
  });
  toast.present();
});
}


}






