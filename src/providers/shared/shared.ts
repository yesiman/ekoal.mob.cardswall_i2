import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Brightness } from '@ionic-native/brightness';
/*
  Generated class for the SharedProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SharedProvider {

  user:any = {
    logedIn:false
  };

  public brightKeeper:any = -1;

  constructor(private brightness: Brightness) {
    
  }

  unbright(){
    if (this.brightKeeper != -1)
    {
      this.brightness.setBrightness(this.brightKeeper);
    }
  }
  bright(){
    this.brightness.getBrightness().then((brightness) => {
        this.brightKeeper = brightness;
    });
    this.brightness.setBrightness(1);
  }

  getbright(){
    this.brightness.getBrightness().then((brightness) => {
        this.brightKeeper = brightness;
    });
  }

}
