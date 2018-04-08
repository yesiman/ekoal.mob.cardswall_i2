import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AngularFireStorage } from 'angularfire2/storage';
/*
  Generated class for the SqlsonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
declare var firebase: any;

@Injectable()
export class AsyncLogo {
  private fileTransfer: FileTransferObject = this.transfer.create();  
  constructor(private transfer: FileTransfer,private file: File,private storage: AngularFireStorage) {
    
  }

  get(item) {
    if (item.logo){
      var that = this;
    //alert(this.file.applicationStorageDirectory);
    that.file.checkFile(that.file.dataDirectory, item.logo).then(
      function(data) {
        if (data)
        {
          item.logoUrl = that.file.dataDirectory  + item.logo; 
        }
        else {
          
          var downloadURL = that.storage.ref(item.logo).getDownloadURL();
      downloadURL.subscribe(url=>{
        if(url){
            item.logoUrl = url;
            that.fileTransfer.download(encodeURI(url),that.file.dataDirectory  + item.logo,true,{})
            .then((data) => {
              // success
            }, (err) => {
              
            })
        }
     })
        }
      }
    ).catch(function(err)
    {
      
      var downloadURL = that.storage.ref(item.logo).getDownloadURL();
      downloadURL.subscribe(url=>{
        if(url){
            item.logoUrl = url;
            that.fileTransfer.download(encodeURI(url),that.file.dataDirectory  + item.logo,true,{})
            .then((data) => {
              // success
            }, (err) => {
              
            })
        }
     })
   
      
    });
    }
    else {
      //DEFAULT IMage
      return null;
    }
  }



 // platform.ready().then(() => {
  //    
   // });
}
