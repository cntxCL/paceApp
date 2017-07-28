import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { RSSFeedReader } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatsPage } from '../pages/chats/chats';
import { Chat } from '../pages/chat/chat';
import { DetailPage } from '../pages/detail/detail';
import { mainHome } from '../pages/mainHome/mainHome';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RssServiceProvider } from '../providers/rss-service/rss-service';

@NgModule({
  declarations: [
    RSSFeedReader,
    HomePage,
    ChatsPage,
    Chat,
    DetailPage,
    mainHome
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(RSSFeedReader),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RSSFeedReader,
    HomePage,
    ChatsPage,
    Chat,
    DetailPage,
    mainHome
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RssServiceProvider
  ]
})
export class AppModule {}
