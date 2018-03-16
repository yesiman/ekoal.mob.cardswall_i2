import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/*
  Generated class for the SqlsonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
declare var firebase: any;

@Injectable()
export class AsyncLogo {
  private storageRef: any;
  private fileTransfer: FileTransferObject = this.transfer.create();  
  constructor(private transfer: FileTransfer,private file: File) {
    this.storageRef = firebase.storage().ref();
  }

  get(item) {
    var that = this;
    //alert(this.file.applicationStorageDirectory);
    that.file.checkFile(that.file.dataDirectory, item.logo).then(
      function(data) {
        if (data)
        {
          item.logoUrl = that.file.dataDirectory  + item.logo; 
        }
        else {
          that.storageRef.child(item.logo).getDownloadURL().then(function (url) {
            item.logoUrl = url;
            that.fileTransfer.download(encodeURI(url),that.file.dataDirectory  + item.logo,true,{})
            .then((data) => {
              
              // success
            }, (err) => {
              // error
            })
        }).catch(function (error) {
          console.log("error",error);
          });
        }
      }
    ).catch(function(err)
    {
      that.storageRef.child(item.logo).getDownloadURL().then(function (url) {
          item.logoUrl = url;
            that.fileTransfer.download(encodeURI(url),that.file.dataDirectory  + item.logo,true,{})
            .then((data) => {
              // success
            }, (err) => {
              
            })
      }).catch(function (error) {
        
        });
    });
  }



 // platform.ready().then(() => {
  //    
   // });
}
