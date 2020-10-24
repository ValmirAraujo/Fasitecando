import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import { UsersPageRoutingModule } from './users-page-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { UsersSearchComponent } from './users-search/users-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    UsersPageComponent,
    UsersRegisterComponent,
    UsersSearchComponent
  ],
  imports: [
    CommonModule,
    UsersPageRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule
  ]
})
export class UsersPageModule { }
