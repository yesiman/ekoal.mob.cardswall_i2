import { Component } from '@angular/core';
import { ViewController, ModalController, NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Platform } from 'ionic-angular/platform/platform';
import { SharedProvider } from '../../providers/shared/shared';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { DemoPage } from '../demo/demo';
import { TabsPage } from '../tabs/tabs';
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
  constructor(public viewCtrl: ViewController,
    private fb: Facebook,private googlePlus: GooglePlus,private uniqueDeviceID: UniqueDeviceID, 
    private platform:Platform, private shar:SharedProvider,public modalCtrl: ModalController, public navCtrl:NavController) {
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad LoginPage');
    //
  }
  //
  initialise(uid) {
    this.shar.user = {
      uid:uid,
      logedIn:true
    };
      this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
      var modal = this.modalCtrl.create(DemoPage,{});
      modal.present();  
      
  }
  //
  pass() {
    //USER ID = DEVICEID
    if (this.platform.is('cordova') && this.uniqueDeviceID) {
      this.uniqueDeviceID.get()
      .then((uuid: any) => this.initialise(uuid))
      .catch((error: any) => console.log(error));  
    }else{
      this.initialise("bim-_s");
    }
  }
  pass2() {
    
      this.initialise("bim-_s");
    
  }
  //
  loginFb() {
    //USER ID = FACEBOOK UID
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => 
      {
        this.initialise(res.authResponse.userID);
      })
      .catch(e => function(e) {
      });
  }
  loginGoog() {
    //USER ID = GOOGLE UID
    this.googlePlus.login({})
    .then(res => {
       this.initialise(res.uid);
      })
    .catch(err => console.error(err));
  }
  
}
