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
import { UserComponent } from 'src/app/components/user-update/user.component';
import { CreateService } from 'src/app/services/CreateService';
import { ReqService } from 'src/app/services/ReqService';
import { SingleUserService } from 'src/app/services/SingleUserService';
import { UpdateService } from 'src/app/services/UpdateService';
import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPageComponent } from './users-page.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { UsersSearchComponent } from './users-search/users-search.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    UsersRegisterComponent,
    UsersSearchComponent,
    UserComponent
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
    ReqService,
    SingleUserService,
    CreateService,
    UpdateService
  ],
  entryComponents: [
    UserComponent
  ]
})
export class UsersPageModule { }
