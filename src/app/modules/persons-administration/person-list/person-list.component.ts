import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  personList: Person [] = [];
  //@ts-ignore
  selectedPerson: Person = null;

  constructor(private personService: PersonService,
              private router: Router,
              private matSnackBar: MatSnackBar) {
    //solo voy a poder acceder desde esta parte del componente
  }

  ngOnInit() {
    this.loadPerson();
  } 
  //me suscribo a un evento y obtengo ese dato

  loadPerson() {
    this.personService.findAll().subscribe(res => {
      if (res.body)
        this.personList = res.body.map(json => new Person(json.id, json.age, json.name, json.lastName));
    }, error => {
      console.log("Ocurrió un error.");
    });
  }

  seleccionarPersona (persona: Person) {
    this.router.navigate(['person','detail', persona.id]);
    // this.selectedPerson = persona;
  }

  crearPersona() {
    this.router.navigate(['person','create'])
  }

  borrarPersona(persona: Person) {
    this.personService.borrar(persona.id).subscribe(res => {
      this.matSnackBar.open("Se borró correctamente la persona", "Cerrar");
      this.loadPerson(); //lo borré y vuelvo a cargar todo el listado
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }
}