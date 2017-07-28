import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';
import { ChatsPage } from '../chats/chats';


declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'mainHome',
  templateUrl: 'mainHome.html'
})
export class mainHome {


  constructor(public navCtrl: NavController,
              private storage: Storage,
              public http: Http,
              private platform: Platform,
              public toastCtrl: ToastController
  ) 
  {


  }

  public goToNews()
  {
    this.navCtrl.push(HomePage);
  }

  public goToChat()
  {
    this.navCtrl.push(ChatsPage);
  }

}
