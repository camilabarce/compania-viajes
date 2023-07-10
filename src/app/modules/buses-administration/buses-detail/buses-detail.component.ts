import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { Model } from 'src/app/models/model';
import { BusDTO, BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-buses-detail',
  templateUrl: './buses-detail.component.html',
  styleUrls: ['./buses-detail.component.css']
})
export class BusesDetailComponent implements OnInit {
  
  busForm = this.formBuilder.group({
    patente: ['', Validators.required],
    cantidadAsientos: [0, Validators.required],
    modelo: [0, Validators.required],
  })

  modeloList: Model[] = [];

  selectedBus: Bus;

  constructor (private router: Router,
              private formBuilder: FormBuilder,
              private modeloService: ModeloService,
              private busService: BusService,
              private matSnackBar: MatSnackBar,
              private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.modeloService.findAll().subscribe(res => {
      this.modeloList = res.body.map(json => {
        const model = new Model (json.id, json.nombre, json.marca);
        // this.findModeloColectivo();
        return model;
      });
    },error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar")
    })
    
    this.route.paramMap.subscribe(params => {
      const id = params.get("id")
      if (id) {
        this.findBus(Number(id));
      }
    });
  };

  findBus (id: number) {
    this.busService.findOne(id).subscribe(res => {
      this.selectedBus = res;

      this.busForm.patchValue({
        patente: res.patente,
        cantidadAsientos: res.cantidadAsientos,
        modelo: res.modeloId
      });
      
      this.busForm.get('modelo').setValue(res.modeloId);
    })
  }

  findModeloColectivo(colectivo: Bus) {
    this.modeloService.findOne(colectivo.modeloId).subscribe(res => {
      colectivo.modelo = new Model(res.id, res.nombre, res.marca);
    })
  }

  guardarCambios(){
    // const modelos: number[] =

    const body: BusDTO = {
      patente: this.busForm.get('patente').value,
      cantidadAsientos: this.busForm.get('cantidadAsientos').value,
      modeloId:  this.busForm.get('modelo').value,
    }

    if (this.selectedBus && this.selectedBus.id) {
      console.log("Actualizando un colectivo");

      body.id= this.selectedBus.id;

      this.busService.actualizarColectivo(body).subscribe(res => {
        this.matSnackBar.open("Se guardaron los cambios del colectivo", "Cerrar");
        this.router.navigate(['buses', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
    } else {
      this.busService.crearColectivo(body).subscribe(res => {
        this.matSnackBar.open("Se creó el colectivo correctamente", "Cerrar");
        this.router.navigate(['buses', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
    }
  }

  volverAtras (){
    this.router.navigate(['buses','list']);
  }
}
