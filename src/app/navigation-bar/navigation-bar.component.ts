import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  currentUrl: string;
  username = this.data.changeNavUsername();

  constructor(private data: DataService, private router: Router) {
    router.events.subscribe(_ => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    });
  }
  ngOnInit() {
    this.username = this.data.changeNavUsername();
  }

}

