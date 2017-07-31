import { Component,ViewChild ,OnDestroy,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";

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
	queries: {
    	content: new ViewChild(Content)
  	}
})
export class Chat implements OnInit,OnDestroy{
	@ViewChild(Content) content: Content;
	public messagesList: any;
	public newmessage: any;
	public mensaje: any;
	public timer: Subscription;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.mensaje = {
			alumno : navParams.get("alumno"),
			docente: navParams.get("docente")
		};
  	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad Chat');
  	}
	send(){
		this.mensaje.texto=this.newmessage;
		this.http.post('http://pace.cntx.cl/api/mensaje/enviar', this.mensaje)
			.map(res => res.json())
			.subscribe(data => {
				this.messagesList.push(data);
				this.scrollToBottom();   
			});
		this.newmessage="";
		
  	}
  	scrollToBottom(){
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.contentHeight+100, 100);
    }
    ngOnInit(){
    	let timer1 = Observable.timer(0,2000);
    	this.timer = timer1.subscribe(t => {
    		this.http.post('http://pace.cntx.cl/api/mensajes', this.mensaje)
				.map(res => res.json())
				.subscribe(data => {
					this.messagesList  = data;
					this.scrollToBottom();   
				});
    	});
	}
	ngOnDestroy() {
		this.timer.unsubscribe();
	}
}
