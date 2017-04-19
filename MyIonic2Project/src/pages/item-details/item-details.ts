import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Ruta } from '../../app/mock-backend/ruta';
import { RouteDetail } from '../../app/route-detail';
import { MapPage } from '../map/map';
import { RoutesDetailService } from '../../providers/routes-detail-service';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
     providers: [RoutesDetailService]
})
export class ItemDetailsPage {
  selectedItem: RouteDetail;
  ruta:Ruta;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
     private rutaDetailService: RoutesDetailService
     ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.ruta = navParams.get('ruta');
   this.getRouteDetail(this.ruta.id);
  }

toMap(selectedItem: RouteDetail){
  this.navCtrl.push(MapPage,{
      selectedItem: selectedItem
    });
}

getRouteDetail(id:number): void {
    this.rutaDetailService.getOne(id)
    .subscribe(data => {
      this.selectedItem = data.json();
    }) ;

  }

/*
  itemTapped(event, ruta) {
    console.log(ruta);
    this.navCtrl.push(ItemDetailsPage, {
      ruta: ruta
    });
  }

  */
}
