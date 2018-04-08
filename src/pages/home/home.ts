import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PartsPage } from '../parts/parts';
import { PartPage } from '../part/part';
import { SharedProvider } from '../../providers/shared/shared';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private itemsCollection: AngularFirestoreCollection<any>;
  private items: any;
  constructor(public navCtrl: NavController,
    private shar:SharedProvider,public afs: AngularFirestore) {
    
  } 
  
  showParts() {
    this.navCtrl.push(PartsPage);
  }
  
  ionViewWillEnter(){
    
  }

  ionViewDidLoad() {
    //CHECK IF DATA CHANGE
    var that = this;
    var uri = "";
    
    //UID TO PASS IN
    if (this.shar.user.logedIn)
    {
      uri = "users/"+this.shar.user.uid+"/cards";
    }
    else {
      uri = "users/bim-_s/cards";
    }

    this.itemsCollection = this.afs.collection<any>(uri);
    this.items = this.itemsCollection.snapshotChanges().map(actions => {       
      return actions.map(a => { 
        //let id = a.payload.doc.id;
        let data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
    
  }

}
