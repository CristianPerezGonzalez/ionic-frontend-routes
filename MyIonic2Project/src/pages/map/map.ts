import { Component } from '@angular/core';
import { NavController, NavParams, Platform  } from 'ionic-angular';
import { GoogleMap,GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsEvent, GoogleMapsLatLng, Toast,GoogleMapsPolylineOptions, GoogleMapsPolyline } from 'ionic-native';
import { RouteDetail } from '../../app/route-detail';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 map: GoogleMap;
 selectedItem: RouteDetail;

 positions: Array<GoogleMapsLatLng>= [
        new GoogleMapsLatLng(43.3131482, -5.6983319),
        new GoogleMapsLatLng(43.3123018, -5.6977171),
    ];

 markers: Array<GoogleMapsMarker> = Array();
 poly_lines: Array<GoogleMapsPolyline> = Array();; 

 

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
 this.selectedItem = navParams.get('selectedItem');
 console.log(this.selectedItem);
     platform.ready().then(() => {
            this.loadMap(this.selectedItem);
        });
  }

loadMap(selectedItem: RouteDetail){
 
        let location = new GoogleMapsLatLng(43.313154,-5.6983989);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        

      
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');

           this.setMarkers();
        });

}

setMarkers(){
          let location = new GoogleMapsLatLng(43.313154,-5.6983989);

  //primero validamos que tengamos los datos de la localización
  if(location){

    //De esta forma estamos colocando el marker en la posicion de nuestra ubicación, con el titulo ‘Mi posición’
    
      
    //Luego lo agregamos al mapa, y una vez agregado llamamos la función showInfoWindow() para mostrar el título señalado anteriormente.
    this.positions.forEach((position) => {
            let markerOptions: GoogleMapsMarkerOptions = {
                  position: position,
                  title: 'Mi posición'
            };
            this.map.addMarker(markerOptions)
                  .then((marker: GoogleMapsMarker) => {
                    marker.showInfoWindow();
            });

    });


  this.positions.forEach((position, index, positions) => {
      let polylineOptions:  GoogleMapsPolylineOptions = {
         points: [positions[index], positions[index-1]],    
                    color: '#00A8E8',                                   
                    width: 1 
       };
       
            this.map.addPolyline(polylineOptions).then((poly_line) => {
                this.poly_lines.push(poly_line);    
            });
        });

  
  }else{
    
    //En caso de no obtener la ubicación es bueno señalar al usuario porque no se mostró el marker
    Toast.show("No se ha podido obtener su ubicación", '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}


setMarker(){
          let location = new GoogleMapsLatLng(43.313154,-5.6983989);

  //primero validamos que tengamos los datos de la localización
  if(location){

    //De esta forma estamos colocando el marker en la posicion de nuestra ubicación, con el titulo ‘Mi posición’
    let markerOptions: GoogleMapsMarkerOptions = {
      position: location,
      title: 'Mi posición'
    };
      
    //Luego lo agregamos al mapa, y una vez agregado llamamos la función showInfoWindow() para mostrar el título señalado anteriormente.

    this.map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
    });
  }else{
    
    //En caso de no obtener la ubicación es bueno señalar al usuario porque no se mostró el marker
    Toast.show("No se ha podido obtener su ubicación", '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
