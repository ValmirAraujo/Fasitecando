import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserUpdateComponent } from 'src/app/components/user-update/user-update.component';
import { UserSearch } from 'src/app/objects/UserSearch';
import { ReqService } from 'src/app/services/ReqService';

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
    public dialog: MatDialog,
    private reqService: ReqService,
  ) {
    this.form = new FormGroup({
      food: this.searchControl,
    });
  }

  ngOnInit(): void {
    this.reqService.listUsers(1).subscribe(res => {
      console.log("lis: ", res);
    })
  }

  openDialog(item: UserSearch): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, { width: '250px', data: item });

    dialogRef.afterClosed().subscribe(result => { });
  }

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
