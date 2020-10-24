import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserUpdateComponent } from 'src/app/components/user-update/user-update.component';
import { UserSearch } from 'src/app/objects/UserSearch';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  animal: string;
  name: string;
  form: FormGroup;
  searchControl = new FormControl();
  users: UserSearch[] = [
    { id: 7, email: 'michael.lawson@reqres.in', first_name: "Michael", last_name: 'Lawson', avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg" },
    { id: 8, email: 'lindsay.ferguson@reqres.in', first_name: "Lindsay", last_name: 'Ferguson', avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg" },
  ];

  constructor(
    private _snackBar: MatSnackBar,
    // public dialog: MatDialog
  ) {
    this.form = new FormGroup({
      food: this.searchControl,
    });
  }

  ngOnInit(): void {
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(UserUpdateComponent, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  excluir(item: UserSearch) {
    console.log("item: ", item);
    let confirmacao = confirm("Deseja realmente excluir o usuário?");
    if (confirmacao) {
      let indice = this.users.indexOf(item);
      this.users.splice(indice, 1);
      this.abrirSnackBar();
    }

  }
  abrirSnackBar() {
    this._snackBar.open('Usuário excluído!', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
