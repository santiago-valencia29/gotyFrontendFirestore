import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private juegos: Game[] = [];
  constructor(private http: HttpClient) {}

  getNominados() {
    if (this.juegos.length > 0) {
      //para cachear peticion, permite no volver a disparar la solicitud
      console.log('desde cache');
      return of(this.juegos);
    } else {
      console.log('desde Internet');
      return this.http
        .get<Game[]>(`${environment.url}/api/goty`)
        .pipe(tap((juegos) => (this.juegos = juegos))); //accion secundaria
    }
  }
}
