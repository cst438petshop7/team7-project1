import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  getuser$: Object;
  user: string;
  pass: string;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  onClickMe() {
    this.data.getUserByUsername(this.user);
    // if (this.data.getUserByUsername(this.user) != null) {

    //   //this.router.navigateByUrl('/products');
    // }

  }
}
