import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private data: DataService) { }

  ngOnInit() {
  }
  onClickMe() {
    if (this.data.userIn.getItem('key') === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/products');
    }

  }
}
