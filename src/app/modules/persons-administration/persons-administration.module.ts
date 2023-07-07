import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonService } from 'src/app/services/person.service';
import { PersonsAdministrationRoutingModule } from './persons-administration-routing.module';
//import { PersonTestService } from 'src/app/services/person-test.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    PersonDetailComponent,
    PersonListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PersonsAdministrationRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [
    PersonDetailComponent, //solo voy a tener acceso a lo que tenga en el módulo si lo exporto
    PersonListComponent
  ],
  providers: [PersonService]
  // providers: [{provide: PersonService, useClass: PersonTestService}
  // ], //*!importante para utilizar servicios de pruebas
})
export class PersonsAdministrationModule { }