import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/auth';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  
  email = '';
  password = '';

  auth: firebase.auth.Auth;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.auth = firebase.auth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  signin(){
    //console.log(this.email, this.password);
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(data =>{
      this.navCtrl.pop();
      let alert = this.alertCtrl.create({
        title: 'Éxito',
        subTitle: 'Usuario registrado',
        buttons: ['Ok']
      });
      alert.present();
    })
    .catch(error =>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error.message,
        buttons: ['Ok']
      });
      alert.present();
    });
  }


}
