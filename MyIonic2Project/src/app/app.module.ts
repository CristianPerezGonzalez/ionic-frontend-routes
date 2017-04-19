import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { MapcardPage } from '../pages/mapcard/mapcard';

import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http} from "@angular/http";
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './mock-backend/InMemoryDataService';

import { RoutesService }          from './../providers/routes-service';
import { RoutesDetailService }          from './../providers/routes-detail-service';
import { CloudModule, CloudSettings } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '221ab9fa'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    MapPage,
    MapcardPage,

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService)
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    MapPage,
    MapcardPage,
  ],
  providers: [
    /*{provide: ErrorHandler,
     useClass: IonicErrorHandler},*/
     RoutesService,
     RoutesDetailService,
    /*MockBackend,
    BaseRequestOptions,{
    provide: Http,
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
    
    }*/]
})
export class AppModule {}
