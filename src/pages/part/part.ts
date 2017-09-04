import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

import { AsyncLogo } from '../../providers/asyncLogo/asyncLogo';
/**
 * Generated class for the PartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-part',
  templateUrl: 'part.html',
})
export class PartPage {
  
  @ViewChild(Slides) slides: Slides;
  
  private status: string;
  private region: any;
  private card;
  private part;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private asyncLogo:AsyncLogo,private ibeacon: IBeacon,platform: Platform) {
    this.card = navParams.get("card");
    this.part = navParams.get("part");
    
// create a new delegate and register it with the native layer
    //let delegate = this.ibeacon.Delegate();
    // Subscribe to some of the delegate's event handlers
    //delegate.didRangeBeaconsInRegion()
     // .subscribe(
      //  data => console.log('didRangeBeaconsInRegion: ', data),
       // error => console.error()
      //);
    /*delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );*/
    //delegate.didEnterRegion()
     // .subscribe(
      //  data => {
       //   console.log('didEnterRegion: ', data);
        //}
      //);

      //GET VENDEUR BEACONS
      //UID PAR VENDEUR
      //     MAJOR/MINOR PAR BOUTIQUE

      /*if (platform.is('cordova')) {
        this.ibeacon.requestAlwaysAuthorization();
        let beaconRegion = this.ibeacon.BeaconRegion('deskBeacon','F7826DA6-ASDF-ASDF-8024-BC5B71E0893E');

        
    }*/
    this.status = "hello";
      
  }


  gotoSl(i) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(i,200);
    this.slides.lockSwipes(true);
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    this.asyncLogo.get(this.part);

    //this.region = this.ibeacon.BeaconRegion('deskBeacon','ffffffff-1234-aaaa-1a2b-a1b2c3d4e5f6');
    //this.status = 'region ok';
    /*this.ibeacon.isBluetoothEnabled()
      .then(
        (data) => this.status = 'isBluetoothEnabled - ' + data,
        error => this.status = 'Native layer failed to begin monitoring: '
      );
    this.status = 'request authorization'
    this.ibeacon.requestAlwaysAuthorization();
     this.status = 'cre beacon region'
    
    this.status = 'request start monit'*/
    //this.ibeacon.startMonitoringForRegion(this.region)
    //  .then(
    //    () => this.status = 'Native layer recieved the request to monitoring',
    //    error => this.status = 'Native layer failed to begin monitoring: '
    //  );
  }

}
