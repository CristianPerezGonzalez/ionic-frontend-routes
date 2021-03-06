import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { RoutesService } from '../../providers/routes-service';
import { Route } from '../../entities/route';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [RoutesService]

})
export class ListPage {
  rating: number = 1;
  difficulty: number = 1;
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  routes: Route[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private rutaService: RoutesService,
    public loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
  }


  ngOnInit(): void {
    this.getRutas();
    // console.log(this.routes);
  }

  ngOnDestroy(): void {
    // console.log(this.routes);
  }

  getRutas(): void {
    this.rutaService.getAll()
      .subscribe(data => {
        this.routes = data.json();
      });

  }

  itemTapped(event, ruta: Route) {
    console.log(ruta);

    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();


    this.navCtrl.push(ItemDetailsPage, {
      ruta: ruta
    });
  }

  itemPanned(event, ruta: Route) {
    ruta.name = "Eliminado";
  }

  ratingSelect() {
    console.log('selected: ' + this.rating);
    this.rutaService.getByStars(this.rating)
      .subscribe(data => {
        this.routes = data.json();
      });
  }
  
  difficultySelect() {
    console.log('selected: ' + this.difficulty);
    this.rutaService.getByDifficulty(this.difficulty)
      .subscribe(data => {
        this.routes = data.json();
      });
  }
}
