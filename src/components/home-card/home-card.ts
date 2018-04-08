import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PartPage } from '../../pages/part/part';

import { AsyncLogo } from '../../providers/asyncLogo/asyncLogo'
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the HomeCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'home-card',
  templateUrl: 'home-card.html'
})
export class HomeCardComponent {
  //
  @Input() card: any;
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  
  part: any = {};
  //
  constructor(public navCtrl: NavController,private asyncLogo:AsyncLogo,private afs: AngularFirestore) {

    

    
  }

  showCard() {
    this.navCtrl.push(PartPage, {card:this.card,part:this.part});
  }

  ngOnInit(): void {
    //
    this.itemDoc = this.afs.collection("parts").doc<any>(this.card.part);
    this.item = this.itemDoc.valueChanges();
    
    this.item.subscribe(data => {
      this.part = data;  
      this.asyncLogo.get(data);
    });
    
    
    
  }
  
}
