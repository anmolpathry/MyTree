import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';

export const config = {
  apiKey: "AIzaSyCIoYMVmzi6rbRIUWomoQCKmkiCFpy2Tro",
  authDomain: "mytree-7256a.firebaseapp.com",
  databaseURL: "https://mytree-7256a.firebaseio.com",
  projectId: "mytree-7256a",
  storageBucket: "mytree-7256a.appspot.com",
  messagingSenderId: "719379181396",
  appId: "1:719379181396:web:1a41d04aa686b187"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

