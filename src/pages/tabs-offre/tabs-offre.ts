import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { OffresPage } from '../offres/offres';
import { OffrePage } from '../offre/offre';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs-offre.html'
})
export class TabsOffrePage {
  offre:any;

  tab1Root = OffrePage;
  tab2Root = OffresPage;
  tab3Root = OffresPage;
  tab4Root = ContactPage;
  constructor(navParams: NavParams,public viewCtrl: ViewController) {
    this.offre = navParams.get('offre');
    console.log("tabsOffre",this.offre);
  }
  
}
