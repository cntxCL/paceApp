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

      this.loadRssData(null);

    });
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
          console.log('all clear, refreshing');
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

      this.navCtrl.push(DetailPage,{
        feedItem: feedItem
      });
  }

  loadRssData(refresher) {

    console.log('load...');

    this.getCachedRssData().then((data) => {

      if (data) {
        console.log('found cached data');
        let parsedData = JSON.parse(data);
        this.rssFeedItems = parsedData.items;

        if (refresher){
          refresher.complete();
        }
      } else {
        console.log('no cached data found');

        this.http.get('https://api.rss2json.com/v1/api.json?rss_url='
          + encodeURIComponent('https://www.wired.com/category/science/feed/'))
          .map(res => res.json()).subscribe(
          data => {
            console.log('http get..');
            console.log(data);
            this.rssFeedItems = data.items;
            this.setCachedRssData(JSON.stringify(data.items));
            console.log("data loaded and cached!");
            if (refresher){
              refresher.complete();
            }
          },
          err => {
            console.log("Error!");
            if (refresher){
              refresher.complete();
            }
          });
      }
    });


  }

  setCachedRssData(theData) {
    console.log('set data');
    this.storage.set('cachedrssdata', theData);
  }


  getCachedRssData() {
    console.log('get data');
    return this.storage.get('cachedrssdata');
  }

  clearCachedRssData() {

    console.log('get data');
    this.storage.clear().then((data) => {
      console.log('all clear');
    })
  }

}
