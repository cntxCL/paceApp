import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';

import 'rxjs/add/operator/map';

declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rssFeedItems: any[];

  hasNetwork: boolean = false;

  showPullToRefresh: boolean = false;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              public http: Http,
              private platform: Platform,
              public toastCtrl: ToastController
  ) {


    this.checkNetwork().then(() => {

      if (!this.hasNetwork){

        let toast = this.toastCtrl.create({
          message: 'No Network Connection, failed to refresh feed',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
    this.doRefresh(null);
  }

  checkNetwork() {
    return this.platform.ready().then(() => {

      if (!navigator.connection){
        // we don't have access to the core network plugin, so we're probably running in dev
        // let us assume that the connection is ok;
        this.hasNetwork = true;
        return;

      }

      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
        this.hasNetwork = false;
      } else {
        this.hasNetwork = true;
      }

    });
  }

  doRefresh(refresher) {

    this.checkNetwork().then(() => {

      if (this.hasNetwork){

        this.storage.remove('cachedrssdata').then(() => {
          this.loadRssData(refresher);
        });

      } else {
        let toast = this.toastCtrl.create({
          message: 'No Network Connection, failed to refresh feed',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        refresher.complete();
      }

    });

  }

  itemSelected(feedItem) {

      /*this.navCtrl.push(DetailPage,{
        feedItem: feedItem
      });*/
      window.open(feedItem.link, '_blank');
  }

  loadRssData(refresher) {
    this.getCachedRssData().then((data) => {

      if (data) {
        let parsedData = JSON.parse(data);
        this.rssFeedItems = parsedData.items;
        if (refresher){
          refresher.complete();
        }
      } else {
        this.http.get('https://api.rss2json.com/v1/api.json?rss_url='
          + encodeURIComponent('http://pace.ucsc.cl/feed/'))
          .map(res => res.json()).subscribe(
          data => {
            this.rssFeedItems = data.items;
            this.setCachedRssData(JSON.stringify(data.items));
            if (refresher){
              refresher.complete();
            }
          },
          err => {
            if (refresher){
              refresher.complete();
            }
          });
      }
    });
  }

  setCachedRssData(theData) {
    this.storage.set('cachedrssdata', theData);
  }

  getCachedRssData() {
    return this.storage.get('cachedrssdata');
  }

  clearCachedRssData() {
    this.storage.clear().then((data) => {
    })
  }

  formatDate(dateStr)
  {
    return new Date(dateStr).toLocaleString("es-CL").split(" ")[0];
  }

}
