import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { Model } from 'src/app/models/model';
import { Person } from 'src/app/models/person';
import { Trip } from 'src/app/models/trip';
import { BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { PersonService } from 'src/app/services/person.service';
import { TripService, TripDTO } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})

export class TripDetailComponent implements OnInit {

  tripForm = this.formBuilder.group({
    origen: ['', Validators.required],
    destino: ['', Validators.required],
    fechaSalida: [new Date(), Validators.required],
    fechaLlegada: [new Date(), Validators.required],
    colectivo: [0, Validators.required],
    pasajeros: [[], Validators.required]
  })

  busList: Bus[] = [];
  personList: Person[] = [];

  selectedTrip: Trip;

  constructor(private formBuilder: FormBuilder,
              private busService: BusService,
              private modeloService: ModeloService,
              private personService: PersonService,
              private tripService: TripService,
              private router: Router,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar) {};

  ngOnInit() {
    this.busService.findAll().subscribe(res => {
      this.busList = res.body.map(json => {
        const bus = new Bus(json.id, json.patente, json.cantidadAsientos, json.modeloId);
        this.findModeloColectivo(bus);
        return bus;
      });
    },
      error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar")
      })

    this.personService.findAll().subscribe(res => {
      this.personList = res.body.map(json => new Person(json.id, json.age, json.name, json.lastName));
    })

    this.route.paramMap.subscribe(params => {
      const id = params.get("id")
      console.log("El id que estoy editando es: " + id);
      if (id) {
        // @ts-ignore
        this.findTrip(Number(id));
      }
    });
    
  };

  findTrip(id: number) {
    this.tripService.findOne(id).subscribe(res => {
      this.selectedTrip = res;

      this.tripForm.patchValue({
        origen: res.lugarSalida,
        destino: res.lugarDestino,
        fechaSalida: new Date(res.fechaSalida),
        fechaLlegada: new Date(res.fechaLlegada),
        colectivo: res.idColectivo,
      });

      // @ts-ignore
      this.tripForm.get('pasajeros').setValue(res.personaId);
    })
  }

  findModeloColectivo(colectivo: Bus) {
    this.modeloService.findOne(colectivo.modeloId).subscribe(res => {
      colectivo.modelo = new Model(res.id, res.nombre, res.marca);
    })
  }

  guardarCambios() {
    const pasajeros: number[] = this.tripForm.get('pasajeros').value;

    const body: TripDTO = {
      lugarSalida: this.tripForm.get('origen').value,
      lugarDestino: this.tripForm.get('destino').value,
      fechaLlegada: this.tripForm.get('fechaLlegada').value,
      fechaSalida: this.tripForm.get('fechaSalida').value,
      personaId: pasajeros,
      idColectivo: this.tripForm.get('colectivo').value,
    }

    if (this.selectedTrip && this.selectedTrip.id) {
      console.log("Actualizando un viaje");

      body.id = this.selectedTrip.id;

      this.tripService.actualizarViaje(body).subscribe(res => {
        this.matSnackBar.open("Se guardaron los cambios del viaje", "Cerrar");
        this.router.navigate(['trips', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
    }
    else {
      this.tripService.crearViaje(body).subscribe(res => {
        this.matSnackBar.open("Se creó el viaje correctamente", "Cerrar");
        this.router.navigate(['trips', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
    }
  }

  volverAtras (){
    this.router.navigate(['trips','list']);
  }
}
