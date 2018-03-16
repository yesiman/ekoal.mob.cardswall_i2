import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqlsonProvider } from '../../providers/sqlson/sqlson'

import { PartsPage } from '../parts/parts';
import { PartPage } from '../part/part';

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
    var uri = "";
    var logedIn = false;
    if (logedIn)
    {
      uri = "users/wMniJbwerObmIQjgOhnxtKNqxZX2/cards";
    }
    else {
      uri = "local/cards";
    }
    that.sqlsonProvider.find(uri).then(function (data) {
      that.items = data;
      for (var i = 0;i < that.items.length-1;i++){
        //that.getLogoAsync(that.items[i]);
      }
    });
    
  }

}
