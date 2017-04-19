import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Ruta } from './ruta';
@Injectable()
export class RutaService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private rutasUrl = 'api/rutas';  // URL to web api
  constructor(private http: Http) { }
  getRutas(): Promise<Ruta[]> {
    return this.http.get(this.rutasUrl)
               .toPromise()
               .then(response => response.json().data as Ruta[])
               .catch(this.handleError);
  }
  getRuta(id: number): Promise<Ruta> {
    const url = `${this.rutasUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Ruta)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.rutasUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  create(name: string): Promise<Ruta> {
    return this.http
      .post(this.rutasUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  update(hero: Ruta): Promise<Ruta> {
    const url = `${this.rutasUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
