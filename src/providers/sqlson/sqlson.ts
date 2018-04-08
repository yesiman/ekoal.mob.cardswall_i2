import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SqlsonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

declare var firebase: any;

@Injectable()
export class SqlsonProvider {
  
  private config = {
      apiKey: "AIzaSyCxA53vIbh2IxJArhr_Wh5DdXJ6QMlcZxE",
      authDomain: "cardwall-8a7fd.firebaseapp.com",
      databaseURL: "https://cardwall-8a7fd.firebaseio.com/",
      projectId: "cardwall-8a7fd",
      storageBucket: "cardwall-8a7fd.appspot.com",
      messagingSenderId: "169975057158"
    };
  
  
  constructor(private storage: Storage) {
    
    firebase.initializeApp(this.config);
  }

  initialize(aRefUrls) {
    var that = this;
    that.storage.set("__system/lastSync", 1);
    var aRefs = [];
    for (var reliARefUrls = 0; reliARefUrls < aRefUrls.length;reliARefUrls++)
    {
      var ref = firebase.database().ref('/' + aRefUrls[reliARefUrls]);
      //ref.orderByChild("dateModif").startAt(1).on('child_added', function(snapshot) {
      ref.on('child_added', function(snapshot) {
        var obj = snapshot.val();
        obj.key = snapshot.key;
        that.storage.set(that.getClearPath(snapshot.ref.toString()), obj);
        
      });
      aRefs.push(ref);
    }
  }
  getClearPath(ref) {
    return ref.replace(this.config.databaseURL,"");
  }
  push(collection,obj) {
    var ref = firebase.database().ref('/' + collection).push(obj);
  }
  findOne(ikey) {
    var that = this;
    console.log("FINDONE");
    return new Promise(function(resolve,reject){
      that.storage.forEach( (value, key, index) => {
        console.log(ikey,key);
        if (ikey == key)
        {
          resolve(value);
        }
      });
    });
  }
  find(collection) {
    var that = this;
    return new Promise(function(resolve,reject){
      var ret = [];
      that.storage.length().then((data) => {
        var length = data;
        that.storage.forEach( (value, key, index) => {
          if (key.startsWith(collection + "/"))
          {
            ret.push(value);
          }
          if (index == length)
          {
            resolve(ret);
          }
        });
      });
      
      
    })
  }


 // platform.ready().then(() => {
  //    
   // });
}
