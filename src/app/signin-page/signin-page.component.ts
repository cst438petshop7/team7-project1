import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  getuser$: Object;
  loginForm: FormGroup;
  user: string;
  pass: string;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])

    });
  }

  onClickMe() {
    alert(this.loginForm.value.userName);
    this.data.getUserByUsername(this.loginForm.value.userName);

  }
}
