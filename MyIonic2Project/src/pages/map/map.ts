import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsMarkerOptions, Geolocation, GoogleMapsMarker, GoogleMapsEvent, GoogleMapsLatLng, Toast, GoogleMapsPolylineOptions, GoogleMapsPolyline } from 'ionic-native';
import { RouteDetail } from '../../app/route-detail';
import { Marker } from '../../app/marker';
import { RoutesService } from '../../providers/routes-service';
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
  coordinates: string;
  positionsString: string[];
  positions: Array<GoogleMapsLatLng> = [

  ];



  markers: Array<Marker> = Array();
  poly_lines: Array<GoogleMapsPolyline> = Array();;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rutaService: RoutesService,
    public platform: Platform) {
    this.selectedItem = navParams.get('selectedItem');
    this.coordinates = this.selectedItem.coordinates;
    this.positionsString = this.coordinates.split(",0 ");
    //console.log(this.positionsString);
    this.positionsString.forEach(e => this.positions.push(new GoogleMapsLatLng(Number.parseFloat(e.split(",")[1]), Number.parseFloat(e.split(",")[0]))));
    this.positions = this.positions.slice(0, this.positions.length - 2);
    //console.log(this.positions);
    //console.log(this.selectedItem);
    platform.ready().then(() => {
      this.loadMap(this.selectedItem);
    });
  }

  loadMap(selectedItem: RouteDetail) {

    //let location = new GoogleMapsLatLng(43.313154,-5.6983989);
    // let location = new GoogleMapsLatLng(this.selectedItem.latitude,this.selectedItem.longitude);
    let location = this.positions[0];
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
        'zoom': 12,
        'bearing': 50
      }
    });





    this.map.on(GoogleMapsEvent.MAP_READY, ).subscribe(() => {
      console.log('Map is ready!');
      this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((event) => {
        console.log(event.latLng);

        Geolocation.watchPosition().subscribe((position) => {

          this.setMarker(position.coords);


        });
      });

      this.getMarkers(this.selectedItem.id);
      
      this.setPolyline();
    });

  }
  ngOnInit(): void {
    //console.log("me destruyo");
    //this.setMarkers() 
  }

  ngOnDestroy(): void {
    //console.log("me destruyo");
    this.map.remove();
  }

  getMarkers(route_id: number): void {
    this.rutaService.getMarkersByRoute(route_id)
      .subscribe(data => {
        this.markers = data.json();
        this.setMarkers();
      });

  }

  setMarkers() {
    

    // let location = new GoogleMapsLatLng(43.313154,-5.6983989);
    //let location = new GoogleMapsLatLng(this.selectedItem.latitude,this.selectedItem.longitude);
    let location = this.positions[0];
    //primero validamos que tengamos los datos de la localización
    if (location) {

      //De esta forma estamos colocando el marker en la posicion de nuestra ubicación, con el titulo ‘Mi posición’


      //Luego lo agregamos al mapa, y una vez agregado llamamos la función showInfoWindow() para mostrar el título señalado anteriormente.
      console.log(this.markers);
      this.markers.forEach((marker) => {
        let markerOptions: GoogleMapsMarkerOptions = {
          position: new GoogleMapsLatLng(marker.latitude, marker.longitude),
          title: marker.title
        };
        this.map.addMarker(markerOptions)
          .then((marker: GoogleMapsMarker) => {
            marker.showInfoWindow();
          });

      });

      /*
          let markerInicial: GoogleMapsMarkerOptions = {
                        position: this.positions[0],
                        title: 'Inicio'
                  };
                  this.map.addMarker(markerInicial)
                        .then((marker: GoogleMapsMarker) => {
                          marker.showInfoWindow();
                  });
      
                  let markerFinal: GoogleMapsMarkerOptions = {
                        position: this.positions[this.positions.length-1],
                        title: 'Meta'
                  };
                  this.map.addMarker(markerFinal)
                        .then((marker: GoogleMapsMarker) => {
                          marker.showInfoWindow();
                  });
      
      */


    } else {

      //En caso de no obtener la ubicación es bueno señalar al usuario porque no se mostró el marker
      Toast.show("No se ha podido obtener su ubicación", '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }

setPolyline(){
  this.positions.forEach((position, index, positions) => {
        let polylineOptions: GoogleMapsPolylineOptions = {
          points: [positions[index], positions[index - 1]],
          color: '#E60026',
          width: 2
        };

        this.map.addPolyline(polylineOptions).then((poly_line) => {
          this.poly_lines.push(poly_line);
        });
      });
}

  setMarker(coor: Coordinates) {
    let location = new GoogleMapsLatLng(coor.latitude, coor.longitude);
    //this.map.getMyLocation().then((e)=>{location = e.latLng});

    //   let location = new GoogleMapsLatLng(43.313154,-5.6983989);
    // location = new GoogleMapsLatLng(this.selectedItem.latitude,this.selectedItem.longitude);

    //primero validamos que tengamos los datos de la localización
    if (location) {

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
    } else {

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
