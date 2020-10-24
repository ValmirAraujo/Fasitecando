import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(): FormGroup {
    return this.registerForm = this.fb.group({
      nome: [null, [Validators.required]],
      trabalho: [null, [Validators.required]],
    })
  }

}
