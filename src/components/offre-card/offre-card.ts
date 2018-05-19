import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { OffrePage } from '../../pages/offre/offre';
import { TabsOffrePage } from '../../pages/tabs-offre/tabs-offre';
/**
 * Generated class for the HomeCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'offre-card',
  templateUrl: 'offre-card.html'
})
export class OffreCardComponent {
  //
  @Input() offre: any;
  firstPgImg:String;
  loaded:boolean = false;
  //
  constructor(public navCtrl: NavController,private storage:AngularFireStorage,public modalCtrl: ModalController) {
    
  }

  ngOnInit(): void {
    console.log("offre",this.offre);
    var downloadURL = this.storage.ref(this.offre.id + "_1.jpg").getDownloadURL();
        downloadURL.subscribe(url=>{
          if(url){
            this.firstPgImg = url;
          }
      })
  }
  isloaded() {
    this.loaded = true;
  }
  showOffre() {
    var modal = this.modalCtrl.create(TabsOffrePage,{offre:this.offre});
    modal.present();  
  }
}
