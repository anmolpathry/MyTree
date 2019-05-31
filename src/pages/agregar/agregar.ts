import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

import {Geolocation} from '@ionic-native/geolocation';
/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {

  copa:string = '';
  tronco:string = '';
  posicion:string = '';
  tipo:string = '';

  imagen;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  user : firebase.User;

  latitud;
  altitud;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl : AlertController, public loadingCtrl: LoadingController,
    private geolocation: Geolocation) {
      this.imagen = this.navParams.get('imagen');
      this.storage = firebase.storage();
      this.db = firebase.firestore()
      this.user = firebase.auth().currentUser;

      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitud = (resp.coords.latitude);
        this.altitud = (resp.coords.longitude);
       }).catch((error) => {
         console.log('Error getting location', error);
       });
       
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }

  addDocument(collection:string, obj:any){
    this.db.collection(collection).add(obj)
    .then((res: any) => {
      console.log('agregado');
      let alert = this.alertCtrl.create(
        {
          title: "Éxito",
          subTitle: "Se agregó",
          buttons: ["Ok"]
        }
      );
      alert.present();
      this.navCtrl.pop();
    })
    .catch((error:any) => {
      console.log('error');
      let alert = this.alertCtrl.create(
        {
          title: "Error",
          subTitle: "No se agregó",
          buttons: ["Ok"]
        }
      );
      alert.present();
    });
  }

  subirImagen(){
    let arbol = {
        copa: this.copa,
        tronco: this.tronco,
        latitud: this.latitud,
        altitud : this.altitud,
        tipo: this.tipo,
        url: '',
        user: this.user.uid
    };

    let loading = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    
    this.db.collection('arboles').add(arbol)
    .then(ref => {
      let nombre = ref.id;
      let uploadTask = this.storage.ref('imagenes/'+ nombre + 'jpg').putString(this.imagen, 
        'data_url')

        uploadTask.then(exito => {
          loading.dismiss();
          let url = exito.downloadURL;
          ref.update({url:url});
          this.navCtrl.pop();
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    })
    loading.present();

  }
}
