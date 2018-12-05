import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { getDefaultService } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  currentUrl: string;
  username = undefined;

  constructor(private router: Router, private data: DataService) {
    router.events.subscribe(_ => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    });
  }
  ngOnInit() {
  }

  getUser() {
    this.username = this.data.changeNavUser();
    return this.data.changeNavUser();
  }


}
// if (!this.data.signedIn) {
//   document.getElementById('cartbutton').setAttribute('style', 'visibility: hidden;');
// } else { document.getElementById('cartbutton').setAttribute('style', 'visibility: visible'); }
