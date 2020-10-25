import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserComponent } from 'src/app/components/user-update/user.component';
import { Company } from 'src/app/objects/Company';
import { UserSearch } from 'src/app/objects/UserSearch';
import { ReqService } from 'src/app/services/ReqService';
import { SingleUserService } from 'src/app/services/SingleUserService';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  nrPage: number = 1;
  ctrlProximo: boolean = false
  animal: string;
  name: string;
  form: FormGroup;
  searchControl = new FormControl();
  users: UserSearch[] = [];
  company: Company;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private reqService: ReqService,
    private singleUserService: SingleUserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.listUsers(this.nrPage);
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
    this.reqService.listUsers(numero).subscribe(res => {
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
    const dialogRef = this.dialog.open(UserComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }


  atualizarDialog(item: UserSearch): void {
    const dialogRef = this.dialog.open(UserComponent, { width: '250px', data: item });

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
