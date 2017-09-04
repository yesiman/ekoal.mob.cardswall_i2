import { Component, Input } from '@angular/core';
import { SqlsonProvider } from '../../providers/sqlson/sqlson'
import { NavController } from 'ionic-angular';

import { PartPage } from '../../pages/part/part';

import { AsyncLogo } from '../../providers/asyncLogo/asyncLogo'
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
  part: any = {};
  //
  constructor(public navCtrl: NavController,private sqlsonProvider:SqlsonProvider,private asyncLogo:AsyncLogo) {

    

    
  }

  showCard() {
    this.navCtrl.push(PartPage, {card:this.card,part:this.part});
  }

  ngOnInit(): void {
    //
    var that = this;
    that.sqlsonProvider.findOne("parts/" + that.card.part).then(function (data) {
      that.part = data;  
      that.asyncLogo.get(that.part);
    });
  }
  
}
