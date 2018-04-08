import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides,PanGesture, ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { AsyncLogo } from '../../providers/asyncLogo/asyncLogo';
import { SharedProvider } from '../../providers/shared/shared';

import { GoogleMap, GoogleMapsEvent, GoogleMapOptions, GoogleMaps } from '@ionic-native/google-maps';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { OffrePage } from '../offre/offre';
/**
 * Generated class for the PartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//declare var mwbScanner:any; 

@Component({
  selector: 'page-part',
  templateUrl: 'part.html',
})

export class PartPage {
  
  @ViewChild(Slides) slides: Slides;
  map: GoogleMap;
  mapReady:boolean = false;
  private status: string;
  private region: any;
  private card;
  private part;
  notesModel:String;

  private itemAfd: AngularFirestoreDocument<any>;
  itemCard: any;

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  

  subTab:String = "card";
//
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private asyncLogo:AsyncLogo,private barcodeScanner: BarcodeScanner,public modalCtrl: ModalController,
    private storage: Storage, private shar:SharedProvider,public afs: AngularFirestore, public platform: Platform) {
    this.card = navParams.get("card");
    this.part = navParams.get("part");
    platform.ready().then(() => {
      //this.loadMap();
    });
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
    //if (mwbScanner){
      //mwbScanner.setCallback(function(result){});
    //}
    
  }

  showOffre(offre) {
    var modal = this.modalCtrl.create(OffrePage,{offre:offre});
    modal.present();  
  }

  addCart(bcodedatas) {

    console.log("this.part",this.part);
    bcodedatas.type = bcodedatas.type.replace("_","");

    this.afs.collection<any>("users/"+this.shar.user.uid+"/cards").add(
      { 
        lib:"Carte " + this.part.lib,
        barcode: bcodedatas,
        part:this.part.id
     });
  }
  //
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (!barcodeData.cancelled)
      {
        this.addCart({
          type:barcodeData.format,
          code:barcodeData.text
        });
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }
//
  gotoSl(i) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(i,200);
    this.slides.lockSwipes(true);
    this.addCart({
      type:"manual",
          code:"input"
    });
  }

  cardDataChange(val) {
    this.itemAfd.update({notes:this.notesModel});
  }


  ionViewDidLoad() {

    let elm = <HTMLElement>document.querySelector("page-part .toolbar-background");
    elm.style.background = this.part.color;

    if (!this.card)
    {
      this.slides.lockSwipes(true);
    }
    else {
      //
      this.itemAfd = this.afs.collection("users/" + this.shar.user.uid + "/cards/").doc<any>(this.card.id);
      this.afs.firestore.doc("users/" + this.shar.user.uid + "/cards/" + this.card.id)
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            this.notesModel = docSnapshot.data().notes;
          }
      });
      
      console.log("this.itemCard",this.itemCard);
    }
    this.itemsCollection = this.afs.collection<any>("promos",ref => ref
      .where('part', '==', this.card.part)
    );
    this.items = this.itemsCollection.snapshotChanges().map(actions => {       
      return actions.map(a => { 
        //let id = a.payload.doc.id;
        let data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
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

  loadMap(){
      this.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
            lat: 43.0741704,
            lng: -89.3809802
          },
          zoom: 18,
          tilt: 30
        }
      });
    
    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;

      this.map.addMarker({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: 43.0741904,
          lng: -89.3809802
        }
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            alert('clicked');
          });
      });

    });
  }

  loadOffres() {

    /*console.log("loadOffres.called");
    this.promosCollection = this.afs.collection<any>("users");
    this.promos = this.promosCollection.snapshotChanges().map(actions => {       
      return actions.map(a => {
        //let id = a.payload.doc.id;.
        console.log("loadOffres.called.snapshotChanges");
        let data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        console.log(data);
        return data;
      });
    });*/
  }
}
