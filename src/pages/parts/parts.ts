import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { PartPage } from '../../pages/part/part';

import { AsyncLogo } from '../../providers/asyncLogo/asyncLogo';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the PartsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var firebase: any;

@Component({
  selector: 'page-parts',
  templateUrl: 'parts.html',
})
export class PartsPage {
  private itemsCollection: AngularFirestoreCollection<any>;
  private items: any;
  private storageRef: any;
  
  constructor(public navCtrl: NavController,
    private asyncLogo:AsyncLogo,public afs: AngularFirestore) {
    //this.storageRef = firebase.storage().ref();
  } 
  
  showPart(item) {
    this.navCtrl.push(PartPage, {part:item});
  }

  ionViewDidLoad() {
let elm = <HTMLElement>document.querySelector("page-parts .toolbar-background");
elm.style.background = "#00E094";

    this.itemsCollection = this.afs.collection<any>("parts");
    this.items = this.itemsCollection.snapshotChanges().map(actions => {       
      return actions.map(a => {
        //let id = a.payload.doc.id;
        let data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.asyncLogo.get(data);
        return data;
      });
    });
  }
}
