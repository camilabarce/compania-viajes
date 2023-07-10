import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  resourceUrl = environment.backendUrl + "viajes"

  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: 'response'}).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrió un error');
      })
    );
  }

  findOne(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un error');
      })
    );
  }

  crearViaje(trip: TripDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, trip).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear el viaje");
      }),
    );
  }

  actualizarViaje(trip: TripDTO) {
    return this.http.put<any>(this.resourceUrl + '/' + trip.id, trip).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No se pudo actualizar el viaje con id: " + trip.id);
      }),
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No existe el viaje");
      }),
    );
  }
}

export interface TripDTO {
  id?: number,
  lugarSalida: string,
  lugarDestino: string,
  fechaLlegada: Date,
  fechaSalida: Date,
  personaId: number[],
  idColectivo: number
}