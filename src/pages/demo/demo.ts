import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html'
})
export class DemoPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public viewCtrl: ViewController) {

   }

  skip() {
    this.viewCtrl.dismiss();
  }
}