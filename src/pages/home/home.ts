import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqlsonProvider } from '../../providers/sqlson/sqlson'

import { PartsPage } from '../../pages/parts/parts';
import { PartPage } from '../../pages/part/part';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private items: any;
  constructor(public navCtrl: NavController,private sqlsonProvider:SqlsonProvider) {
    
  } 
  
  showParts() {
    this.navCtrl.push(PartsPage);
  }
  
  ionViewDidLoad() {
    var that = this;
    that.sqlsonProvider.find("users/wMniJbwerObmIQjgOhnxtKNqxZX2/cards").then(function (data) {
      console.log(data);
      that.items = data;
      for (var i = 0;i < that.items.length-1;i++){
        //that.getLogoAsync(that.items[i]);
      }
    });
    
  }

}
