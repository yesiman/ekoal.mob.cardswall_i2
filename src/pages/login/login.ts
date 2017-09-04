import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { SqlsonProvider } from '../../providers/sqlson/sqlson'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var firebase: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //
  constructor(public viewCtrl: ViewController,public sqlsonProvider:SqlsonProvider) {
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad LoginPage');
    //
  }
  //
  private fbUserState:any = firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      
    } else { 
      //GET DEVICE ID
      /*this.sqlsonProvider.initialize(
        [
          "parts",
          "users_anonymous/cards",
          "users_anonymous/profile",  
        ]);   
        this.viewCtrl.dismiss();*/
    }
  });
  //
  pass() {
    this.sqlsonProvider.initialize(
    [
      "parts",
      "users/bim/cards",
      "users/bim/profile",  
    ]);   
    this.viewCtrl.dismiss();
  };
  login() {
    alert("jkl");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      alert(errorCode + errorMessage);
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  
}
