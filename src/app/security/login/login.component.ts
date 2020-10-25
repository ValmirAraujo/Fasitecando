import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/objects/Login';
import { ReqService } from 'src/app/services/ReqService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  esconderSenha = true;
  register = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private reqService: ReqService
  ) { }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(): FormGroup {
    return this.formulario = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  mensagemErroEmail() {
    if (this.formulario.get('email').hasError('required')) {
      return 'Você deve inserir um e-mail';
    }
    return this.formulario.get('email').hasError('email') ? 'Não é um e-mail válido' : '';
  }

  mensagemErroSenha() {
    return this.formulario.get('password').hasError('required') ? 'Insira um senha' : '';
  }

  login() {
    if (this.formulario.valid) {
      let login: Login = this.formulario.value;
      this.reqService.login(login).subscribe(res => {
        this.router.navigate(['/paginas/users']);
      },
        erro => alert("Usuário não encontrado!"));
    }
  }

  registrar() {
    if (this.formulario.valid) {
      console.log("form: ", this.formulario.value)
      this.router.navigate(['/paginas/users']);
    }
  }

  resetar() {
    this.register = !this.register;
    this.resetForm(this.formulario);
  }

  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

}
