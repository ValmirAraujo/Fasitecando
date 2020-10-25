import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserComponent } from 'src/app/components/user-update/user.component';
import { Company } from 'src/app/objects/Company';
import { UserSearch } from 'src/app/objects/UserSearch';
import { DeleteService } from 'src/app/services/DeleteService';
import { ListUsersService } from 'src/app/services/ListUsersService';
import { SingleUserService } from 'src/app/services/SingleUserService';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  nrPage: number = 1;
  ctrlProximo: boolean = false
  animal: string;
  name: string;
  form: FormGroup;
  searchControl = new FormControl();
  users: UserSearch[] = [];
  usersSelect: UserSearch[] = [];
  company: Company;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private listUsersService: ListUsersService,
    private singleUserService: SingleUserService,
    private deleteService: DeleteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.listUsers(this.nrPage);
    this.allUsers();
  }

  allUsers() {
    this.listUsersService.allUsers().subscribe(res => {
      if (res.data.length > 0) {
        this.usersSelect = res.data;
      }
    },
      erro => alert("Não foi possível obter os usuários."))
  }

  singleUser() {
    if (this.searchControl.value) {
      this.singleUserService.singleUser(this.searchControl.value).subscribe(resposta => {
        this.users = [];
        let single: UserSearch = resposta.data;
        this.company = resposta.ad;
        this.users.push(single);
      }, erro => alert("Nenhum usuário não encontrado!"))
    } else {
      this.nrPage = 1;
      this.listUsers(this.nrPage);
    }

  }

  proxima() {
    this.nrPage += 1
    this.listUsers(this.nrPage);
  }

  anterior() {
    this.nrPage -= 1
    this.listUsers(this.nrPage);
  }

  listUsers(numero: number) {
    this.listUsersService.listUsers(numero).subscribe(res => {
      if (res.data.length > 0) {
        this.users = res.data;
        this.company = res.ad;
        this.ctrlProximo = false;
      } else {
        this.nrPage -= 1;
        this.ctrlProximo = true
      }
    })
  }

  fazerLogout() {
    this.router.navigateByUrl('');
  }

  gravarDialog(): void {
    const dialogRef = this.dialog.open(UserComponent, { width: '350px' });
    dialogRef.afterClosed().subscribe(result => { });
  }


  atualizarDialog(item: UserSearch): void {
    const dialogRef = this.dialog.open(UserComponent, { width: '350px', data: item });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let indice = this.users.indexOf(item);
        this.users[indice].first_name = data.first_name;
        this.users[indice].last_name = data.last_name;
      }
    });
  }

  excluir(item: UserSearch) {
    let confirmacao = confirm("Deseja realmente excluir o usuário?");
    if (confirmacao) {
      this.deleteService.delete(item.id).subscribe(resposta => {
        let indice = this.users.indexOf(item);
        this.users.splice(indice, 1);
        this.abrirSnackBar();
      },
        erro => alert("Não foi possível realizar a operação.")
      )
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
