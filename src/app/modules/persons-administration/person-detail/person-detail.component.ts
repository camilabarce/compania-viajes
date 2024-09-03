import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonDTO, PersonService } from 'src/app/services/person.service';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  
  selectedPerson: Person | null = null; 
  // nameControl = new FormControl('', [Validators.required]);
  // ageControl = new FormControl('', [Validators.required]);
  // lastNameControl = new FormControl('', [Validators.required]);


  personForm: FormGroup = this.fb.group ({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
  })

  constructor (private personService: PersonService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private matSnackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      console.log("El id que estoy editando es: " + id);
      if (id) {
        // @ts-ignore
        this.findPerson(Number(id));
      }
    });
    // this.nameControl.valueChanges.subscribe(res => console.log(res));
  }

  findPerson (id: number) {
    this.personService.findOne(id).subscribe(res => {
      if (res.body) {
        this.selectedPerson = new Person(res.body.id, res.body.age, res.body.name, res.body.lastName);
      
        this.personForm.patchValue({
          name: this.selectedPerson.nombre,
          lastName: this.selectedPerson.apellido,
          age: this.selectedPerson.edad
        })
      }
  
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
      this.router.navigate(['person', 'list']);
    })
  }

  guardarCambios() {

    const body: PersonDTO = {
      id: null,
      name: this.personForm.get('name').value,
      lastName: this.personForm.get('lastName').value,
      age: this.personForm.get('age').value
    }
    if (this.selectedPerson && this.selectedPerson.id) {
      console.log("Actualizando una persona");
      
      body.id = this.selectedPerson.id;

      this.personService.actualizarPersona(body).subscribe(res => {
        this.matSnackBar.open("Se guardaron los cambios", "Cerrar");
        this.router.navigate(['person', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
    }
    else {
      this.personService.crearPersona(body).subscribe(res => {
        this.matSnackBar.open("Se creó la persona correctamente", "Cerrar");
        this.router.navigate(['person', 'list']);
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
      console.log("Creando una persona");
    }
  }

  volverAtras (){
    // this._location.back();
    this.router.navigate(['person','list']);
  }

}