import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Chat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'chat',
  templateUrl: 'chat.html',
})
export class Chat {

	public messagesList: any;
	public newmessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.messagesList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Chat');
  }
  send(){
    this.messagesList.push({
      name: 'Alberto Zenteno',
      message: this.newmessage
    });
    this.newmessage="";
  }

}
