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
  modal: HTMLElement;
  username;
  cred;
  id;

  constructor(private router: Router, private data: DataService) {
    router.events.subscribe(_ => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    });
  }
  ngOnInit() {
    console.log(this.data.userIn.getItem('key'));
    this.modal = document.getElementById('myModal2');
  }

  getUser() {
    this.username = this.data.changeNavUser();
    this.id = this.data.userID.getItem('key2');
    this.cred = this.data.userCred.getItem('key3');
    return this.data.changeNavUser();
  }
  clickCart() {
    this.router.navigateByUrl('/cart');
  }

  getUserSes() {
    return this.data.getUserSess();
  }
  showModal2() {
    this.getUser();
    this.data.getUserCred(this.username);
    this.modal.style.display = 'block';
  }
  hideModal2() {
    this.modal.style.display = 'none';
  }
  logout() {
    this.data.finalCart = [];
    this.data.cartArray = [];
    this.data.cart.removeItem('cart');
    this.data.userIn.removeItem('key');
    this.data.userID.removeItem('key2');
    this.data.userCred.removeItem('key3');
    sessionStorage.clear();
    sessionStorage.clear();
    this.hideModal2();
    this.router.navigateByUrl('/');
  }

}
// if (!this.data.signedIn) {
//   document.getElementById('cartbutton').setAttribute('style', 'visibility: hidden;');
// } else { document.getElementById('cartbutton').setAttribute('style', 'visibility: visible'); }
