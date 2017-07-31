import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { Http, Headers} from '@angular/http';

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
  public docentes: any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
    this.http.get('http://pace.cntx.cl/api/docentes')
      .map(res => res.json())
      .subscribe(data => {
        this.docentes = data;  
      });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }
  public goToChat(id)
  {
    this.navCtrl.push(Chat,{
      alumno: 2,
      docente: id
    });
  }
}
