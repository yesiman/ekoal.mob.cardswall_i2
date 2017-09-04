import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  private saving:boolean;
  
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public modalCtrl: ModalController) {
    //this.presentModal();
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
  
}
