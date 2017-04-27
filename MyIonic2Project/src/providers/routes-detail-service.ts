import { Injectable } from '@angular/core';
import {  Headers,Http, Response/*, RequestOptions */} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Route } from '../entities/route';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/*
  Generated class for the RoutesDetailService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RoutesDetailService {

  
  private routesRest = 'https://myproject-web.cfapps.io/root/';
  private headers = new Headers({
    //Content-Type': 'application/json;charset=UTF-8',

    'Accept': 'application/json;charset=UTF-8',
    
  });
  //private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) {
      console.log('Hello RoutesDetailService Provider');
    }


    
    getAll() : Observable<Response> {  
          return this.http.get(this.routesRest + "routedetail", {headers: this.headers});
      }

    getOne(id: number) : Observable<Response> {  
          return this.http.get(this.routesRest + "routedetail?id="+id, {headers: this.headers});
      }


  create(route: Route): Promise < Route >{
    return this.http
          .post(this.routesRest + "routedetail",JSON.stringify(route), {headers: this.headers})
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);

  }

  delete(pedido: Route): Promise < Route >{
    return this.http
          .delete(this.routesRest + "routedetail/"+ pedido.id)
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);

  }

      private handleError(error : any) : Promise < any > {
          console.error('An error occurred', error); // for demo purposes only
          return Promise.reject(error.message || error);
      }


}
