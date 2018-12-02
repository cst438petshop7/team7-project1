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
  user = '';
  pass = '';

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }

  onClickMe() {
    if (this.data.getUserByUsername(this.user).subscribe(
      data => this.getuser$ = data
    )) {
      this.router.navigateByUrl('/products');
    }

  }
}
