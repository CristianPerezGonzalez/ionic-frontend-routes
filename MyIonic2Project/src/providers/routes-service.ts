import { Injectable } from '@angular/core';
import {  Headers,Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Route } from '../app/route';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the Routes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RoutesService {
  private routesRest = 'http://localhost:8080/root/';
  private headers = new Headers({
    //Content-Type': 'application/json;charset=UTF-8',

    'Accept': 'application/json;charset=UTF-8',
    
  });
  private options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) {
      console.log('Hello Routes Provider');
    }

    
    getAll() : Observable<Response> {  
          return this.http.get(this.routesRest + "routes", {headers: this.headers});
      }


  create(route: Route): Promise < Route >{
    return this.http
          .post(this.routesRest + "route",JSON.stringify(route), {headers: this.headers})
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);

  }

  delete(pedido: Route): Promise < Route >{
    return this.http
          .delete(this.routesRest + "route/"+ pedido.id)
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);

  }

      private handleError(error : any) : Promise < any > {
          console.error('An error occurred', error); // for demo purposes only
          return Promise.reject(error.message || error);
      }

}
