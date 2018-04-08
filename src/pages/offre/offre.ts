import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'offre-demo',
  templateUrl: 'offre.html'
})
export class OffrePage {
  @ViewChild(Slides) slides: Slides;

    offre:any;
    parray:any = [];
  constructor(public viewCtrl: ViewController,navParams: NavParams,private storage: AngularFireStorage) {
    this.offre = navParams.get('offre');
    
  }
  ionViewDidEnter() {
    for (var i = 1;i <= this.offre.nbpages;i++)
    {
      this.parray.push(
        {
          id:this.offre.id + "_" + i,
          src:""
        }

      );
    }
    this.pgChange();
  }
  pgChange() {
    let currentIndex = this.slides.getActiveIndex();
    if (this.parray[currentIndex])
    {
      var downloadURL = this.storage.ref(this.parray[currentIndex].id + ".png").getDownloadURL();
        downloadURL.subscribe(url=>{
          if(url){
            this.parray[currentIndex].src = url;
          }
      })

     }
    

    
    //alert(currentIndex);
    //this.viewCtrl.dismiss();
  }
}