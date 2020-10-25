import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserSearch } from 'src/app/objects/UserSearch';
import { CreateService } from 'src/app/services/CreateService';
import { UpdateService } from 'src/app/services/UpdateService';

@Component({
  selector: 'app-user-update',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  id: number = 0;
  ctrlButton: Boolean;

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserSearch,
    private fb: FormBuilder,
    private createService: CreateService,
    private updateService: UpdateService
  ) { }

  ngOnInit(): void {
    this.criarForm();
    if (this.data) {
      this.ctrlButton = false;
      this.id = this.data.id;
      this.userForm.get('name').setValue(this.data.first_name + " " + this.data.last_name);
    } else {
      this.ctrlButton = true;
    }
  }

  atualizar() {
    if (this.userForm.valid) {
      let user = this.userForm.value;
      this.updateService.update(this.id, user).subscribe(resposta => {

        let nomeCompleto = this.userForm.get('name').value.split(" ");
        this.data.first_name = nomeCompleto[0];
        this.data.last_name = nomeCompleto[1];

        alert("Usuário atualizado com sucesso!")
        this.dialogRef.close(this.data);
      },
        erro => alert("Não foi possível realizar a operação.")
      )
    } else {
      alert("O nome do usuário é obrigatório!")
    }
  }

  gravar() {
    if (this.userForm.valid) {
      let user = this.userForm.value;
      this.createService.create(user).subscribe(resposta => {
        alert("Usuário cadastrado com sucesso!")
        this.dialogRef.close();
      },
        erro => alert("Não foi possível realizar a operação."))
    } else {
      alert("O nome do usuário é obrigatório!")
    }
  }

  criarForm(): FormGroup {
    return this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      job: [null],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
