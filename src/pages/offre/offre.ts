import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides, NavParams, NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AsyncLogo } from '../../providers/asyncLogo/asyncLogo';
import { runInThisContext } from 'vm';

@Component({
  selector: 'page-offre',
  templateUrl: 'offre.html'
})
export class OffrePage {
  @ViewChild(Slides) slides: Slides;
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  loadeds:any = {};
  part: any = {};
    offre:any;
    vc:any;
    parray:any = [];
    currentPage:number = 1;


  constructor(public viewCtrl: ViewController,navParams: NavParams,private storage: AngularFireStorage,private afs: AngularFirestore,private asyncLogo:AsyncLogo, public navCtrl:NavController) {
    this.offre = navParams.get('offre');
    this.vc = navParams.get('vc');
    console.log("OffrePage",this.offre);
  }
  ionViewDidLoad() {
    this.itemDoc = this.afs.collection("parts").doc<any>(this.offre.part);
    this.item = this.itemDoc.valueChanges();
    
    this.item.subscribe(data => {
      this.part = data;  
      console.log("this.part",this.part);
      this.asyncLogo.get(data);
      let elm = <HTMLElement>document.querySelector("page-offre .toolbar-background");
      elm.style.background = this.part.color;
    });
    
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
      this.currentPage = currentIndex + 1;
      var downloadURL = this.storage.ref(this.parray[currentIndex].id + ".jpg").getDownloadURL();
        downloadURL.subscribe(url=>{
          if(url){
            this.parray[currentIndex].src = url;
          }
      })
      
     }
     

    
    //alert(currentIndex);
    //this.viewCtrl.dismiss();
  }
  isloaded(oid)
  {
    this.loadeds[oid] = true;
    //console.log(o);
  }
  closeMe() {
    //console.log("this.navCtrl",this.navCtrl);
    this.vc.dismiss();
    //this.navCtrl.pop();
  }
}