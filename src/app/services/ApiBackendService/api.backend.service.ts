import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LocalStorageService} from "../LocalStorageService/local.storage.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) { }


  obtenerSeries(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(environment.apiUrl +`api/serie/all`, { headers: headers });
  }

  obtenerExpansionPorSerie(serieId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(environment.apiUrl +`api/expansion/obtenerPorSerie/`+ serieId, { headers: headers });
  }

  obtenerCartasPorExpansion(expansionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(environment.apiUrl +`api/carta/obtenerPorExpansion/`+ expansionId, { headers: headers });
  }

  obtenerImagenPorRuta(rutaImagen: string): Observable<any> {
    const params = new HttpParams()
      .set('ruta', rutaImagen);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(environment.apiUrl +`api/archivo/obteneArhivoPorRuta`, { params: params, headers: headers,  responseType: 'blob' as 'json' });
  }

  actualizarCartaVariedad(bodyCartaVariedad: any): Observable<any> {

    const body = bodyCartaVariedad;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(environment.apiUrl +`api/carta/actualizar-carta-variedad`, body, { headers: headers });
  }

}
