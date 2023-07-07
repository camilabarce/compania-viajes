import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripAdministrationRoutingModule } from './trip-administration-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';


@NgModule({
  declarations: [
    TripListComponent,
    TripDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TripAdministrationRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule
  ], 
})
export class TripAdministrationModule { }
