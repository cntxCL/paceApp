import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';

/**
 * Generated class for the ChatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
	toUser:Object;

  constructor(public navCtrl: NavController) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }
  public goToChat()
  {
    this.navCtrl.push(Chat);
  }
}
