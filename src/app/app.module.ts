import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HomeCardComponent } from '../components/home-card/home-card';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { DemoPage } from '../pages/demo/demo';
import { PartsPage } from '../pages/parts/parts';
import { PartPage } from '../pages/part/part';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { IBeacon } from '@ionic-native/ibeacon';
import { SqlsonProvider } from '../providers/sqlson/sqlson';
import { AsyncLogo } from '../providers/asyncLogo/asyncLogo';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DemoPage,
    PartsPage,
    PartPage,
    TabsPage,
    LoginPage,
    HomeCardComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['sqlite','websql','indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    AboutPage,
    ContactPage,
    HomePage,
    DemoPage,
    PartsPage,
    PartPage,
    TabsPage,
    LoginPage,
  ],
  providers: [
    IBeacon,
    BarcodeScanner,
    FileTransfer,
    File,
    SQLite,
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqlsonProvider,
    AsyncLogo
  ]
})
export class AppModule {}
