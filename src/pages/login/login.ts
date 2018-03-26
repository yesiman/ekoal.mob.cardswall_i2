import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SqlsonProvider } from '../../providers/sqlson/sqlson'
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Platform } from 'ionic-angular/platform/platform';
import { SharedProvider } from '../../providers/shared/shared';
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
  constructor(public viewCtrl: ViewController,public sqlsonProvider:SqlsonProvider,
    private fb: Facebook,private googlePlus: GooglePlus,private uniqueDeviceID: UniqueDeviceID, 
    private platform:Platform, private shar:SharedProvider) {
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad LoginPage');
    //
  }
  //
  initialise(uid) {
    this.shar.user = {
      uid:uid
    };
    this.sqlsonProvider.initialize(
      [
        "parts",
        "users/"+this.shar.user.uid+"/cards",
        "users/"+this.shar.user.uid+"/profile",  
      ]);   
      this.viewCtrl.dismiss();
  }
  //
  pass() {
    //USER ID = DEVICEID
    if (this.platform.is('cordova')) {
      this.uniqueDeviceID.get()
      .then((uuid: any) => this.initialise(uuid))
      .catch((error: any) => console.log(error));  
    }else{
      this.initialise("bim");
    }
  }
    
  loginFb() {
    //USER ID = FACEBOOK UID
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => 
      {
        console.log("logued w facebook",res);
      })
      .catch(e => function(e) {
        console.log("error",e);
        this.loading = false;
      });
  }
  loginGoog() {
    //USER ID = GOOGLE UID
    this.googlePlus.login({})
    .then(res => {
       console.log("logued w google",res); 
      })
    .catch(err => console.error(err));
  }
  loged(res){
    //this.getUserDatas(res, this);
  }
}
