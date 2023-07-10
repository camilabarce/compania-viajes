import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const listado: Person [] = [
  new Person (1, 25, "Tomas", "Gómez"),
  new Person (2, 30, "Roberto", "Gómez"),
  new Person (3, 45, "Esteban", "Gómez")
]

@Injectable({
  providedIn: 'root' //se va a inyectar en la raiz
})

export class PersonService {

  resourceUrl = environment.backendUrl + "personas"

  constructor(private http: HttpClient) { }

  findAll (): Observable<HttpResponse<any[]>> {
    // return of (listado).pipe(
    //   catchError(err => {
    //   console.log("Ocurrió un error");
    //   return throwError(() => "Pasó algo");
    // }),
    //   map(persons => { 
    //       persons.forEach (person => person.nombre);
    //       return persons;
    //   }))
  //método que va a representar lo que haría el backend
  
  return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
    catchError(err => {
          console.log("Ocurrió un error");
          return throwError(() => "Pasó algo");
        }),
    );
  }

  findOne (id:number): Observable <HttpResponse<any>> {
  //   return of (listado).pipe(
  //     mergeMap(p => p), first (person => person.id === id));
  // }

  return this.http.get<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
    catchError(err => {
      console.log("Ocurrio un error: ");
      console.log(err);
      return throwError(() => "No existe la persona");
    }),
  );
  }

  crearPersona(persona: PersonDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, persona).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear la persona");
      }),
    );
  }

  actualizarPersona(persona: PersonDTO): Observable<any> {
    return this.http.put<any>(this.resourceUrl + '/' + persona.id, persona).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No se pudo actualizar la persona");
      }),
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrió un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }
}

export interface PersonDTO {
  id: number,
  name: string,
  lastName: string,
  age: number
}