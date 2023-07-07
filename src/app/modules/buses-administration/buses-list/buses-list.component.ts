import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css']
})
export class BusesListComponent implements OnInit {
  
  busesList: Bus [] = [];

  constructor (private busService: BusService,
              private modeloService: ModeloService,
              private router: Router) {}
  
  ngOnInit() {
    this.busService.findAll().subscribe(res => {
      this.busesList = res.body.map(res => {
        const bus = new Bus (res.id, res.patente, res.cantidadAsientos, res.modeloId);
        this.loadModelo(bus);
        return bus;
      });
    })
  }

  loadModelo (bus: Bus) {
    this.modeloService.findOne(bus.modeloId).subscribe(res => {
      bus.modelo = res;
    })
  }

  editarColectivo (bus) {
    this.router.navigate(['buses', 'detail', bus.id]);
  }
  crearColectivo() {
    this.router.navigate(['buses','create'])
  }
}
