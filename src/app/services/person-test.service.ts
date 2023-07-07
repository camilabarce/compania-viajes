import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root' //se va a inyectar en la raiz
})
export class PersonTestService {

    constructor() { }

    // findAll (): Observable<Person[]> {
    //     return of ([
    //         new Person (1, "Tomas", "Perez", 25),
    //         new Person (2, "Roberto", "Perez", 30),
    //         new Person (3, "Esteban", "Perez", 45)
    //     ])
    // }
}