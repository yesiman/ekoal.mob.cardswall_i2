import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { PartPage } from '../../pages/part/part';

import { SqlsonProvider } from '../../providers/sqlson/sqlson';
import { AsyncLogo } from '../../providers/asyncLogo/asyncLogo';

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

  private items: any;
  private storageRef: any;
  private fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController,private sqlsonProvider:SqlsonProvider,private asyncLogo:AsyncLogo,private transfer: FileTransfer,private file: File) {
    this.storageRef = firebase.storage().ref();
  } 
  
  showPart(item) {
    this.navCtrl.push(PartPage, {part:item});
  }

  ionViewDidLoad() {
    var that = this;
    that.sqlsonProvider.find("parts").then(function (data) {
      that.items = data;
      for (var i = 0;i < that.items.length-1;i++){
        that.asyncLogo.get(that.items[i]);
      }
    });
  }
}
