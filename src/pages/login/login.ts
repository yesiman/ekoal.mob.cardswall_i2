import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
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
  constructor(public viewCtrl: ViewController,public sqlsonProvider:SqlsonProvider,private fb: Facebook,private googlePlus: GooglePlus) {
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad LoginPage');
    //
  }
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
  
  loginFb() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => this.loged(res))
      .catch(e => function(e) {
        console.log("error",e);
        this.loading = false;
      });
  }
  loginGoog() {
    this.googlePlus.login({})
    .then(res => this.loged(res))
    .catch(err => console.error(err));
  }
  loged(res){
    //this.getUserDatas(res, this);
  }
}
