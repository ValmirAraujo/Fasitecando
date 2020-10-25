import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserUpdateComponent } from 'src/app/components/user-update/user-update.component';
import { ReqService } from 'src/app/services/ReqService';
import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPageComponent } from './users-page.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { UsersSearchComponent } from './users-search/users-search.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    UsersRegisterComponent,
    UsersSearchComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    UsersPageRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [
    ReqService
  ],
  entryComponents: [
    UserUpdateComponent
  ]
})
export class UsersPageModule { }
