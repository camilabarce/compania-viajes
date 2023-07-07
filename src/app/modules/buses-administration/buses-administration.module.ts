import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusesAdministrationRoutingModule } from './buses-administration-routing.module';
import { BusesListComponent } from './buses-list/buses-list.component';
import { BusesDetailComponent } from './buses-detail/buses-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    BusesListComponent,
    BusesDetailComponent
  ],
  imports: [
    CommonModule,
    BusesAdministrationRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class BusesAdministrationModule { }
