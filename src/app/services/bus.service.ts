import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  resourceUrl = environment.backendUrl + "colectivos"

  constructor (private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(error => {
        console.log(error.message); //no es buena idea si es algo productivo
        return throwError(() => "Ocurrió un error");
      })
    )
  }

  findOne(id: number): Observable<Bus> {
    return this.http.get<Bus>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => "Ocurrió un error");
      })
    );
  }

  crearColectivo (bus: BusDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, bus).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear el colectivo");
      }),
    );
  }

  actualizarColectivo (bus: BusDTO) {
    return this.http.put<any>(this.resourceUrl + '/' + bus.id, bus).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No se pudo actualizar el colectivo con id: " + bus.id);
      }),
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No existe el colectivo");
      }),
    );
  }
}

export interface BusDTO {
  id?: number;
  patente: string;
  cantidadAsientos: number;
  modeloId: number;
}