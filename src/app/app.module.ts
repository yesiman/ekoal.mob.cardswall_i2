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
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Brightness } from '@ionic-native/brightness';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 
import { AngularFireModule } from 'angularfire2'; 
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { DemoPage } from '../pages/demo/demo';
import { OffrePage } from '../pages/offre/offre';
import { PartsPage } from '../pages/parts/parts';
import { PartPage } from '../pages/part/part';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';

import { IBeacon } from '@ionic-native/ibeacon';
import { AsyncLogo } from '../providers/asyncLogo/asyncLogo';
import { SharedProvider } from '../providers/shared/shared';
import { HeaderPartComponent } from '../components/header-part/header-part';
import { HeaderPartsComponent } from '../components/header-parts/header-parts';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { OffreCardComponent } from '../components/offre-card/offre-card';
import { HeaderOffreComponent } from '../components/header-offre/header-offre';
import { OffresPage } from '../pages/offres/offres';
import { HeaderProfilComponent } from '../components/header-profil/header-profil';
import { TabsOffrePage } from '../pages/tabs-offre/tabs-offre';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DemoPage,
    OffrePage,
    PartsPage,
    PartPage,
    TabsPage,
    TabsOffrePage,
    LoginPage,
    OffresPage,
    HomeCardComponent,
    OffreCardComponent,
    HeaderPartComponent,
    HeaderPartsComponent,
    HeaderOffreComponent,
    HeaderProfilComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, 
      {
        backButtonText: 'Retour'
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['sqlite','websql','indexeddb']
    }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp({ 
      apiKey: "AIzaSyCxA53vIbh2IxJArhr_Wh5DdXJ6QMlcZxE",
      authDomain: "cardwall-8a7fd.firebaseapp.com",
      databaseURL: "https://cardwall-8a7fd.firebaseio.com",
      projectId: "cardwall-8a7fd",
      storageBucket: "cardwall-8a7fd.appspot.com",
      messagingSenderId: "169975057158" }), 
    AngularFirestoreModule.enablePersistence(),AngularFireStorageModule,NgxBarcodeModule
    
  ],  
  bootstrap: [IonicApp],
  entryComponents: [ 
    AboutPage,
    ContactPage,
    HomePage,
    OffresPage,
    DemoPage,
    OffrePage,
    PartsPage,
    PartPage,
    TabsPage,
    TabsOffrePage,
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
    UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AsyncLogo,
    SharedProvider,
    Brightness
  ]
})
export class AppModule {}
