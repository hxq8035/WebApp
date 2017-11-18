import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule} from '@angular/http'
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import {HomePage} from '../pages/home/home'
import {IndexPage} from '../pages/index/index'
import {UserCenterPage} from '../pages/user-center/user-center'
import {FilmPage} from '../pages/film/film'
import {DetailPage} from '../pages/detail/detail'
import {LoginPage} from '../pages/login/login'
import {HotPage} from '../pages/hot/hot'
import {CommentAllPage} from '../pages/comment-all/comment-all'
import {SettingPage} from '../pages/setting/setting'
import {RegisterPage} from '../pages/register/register'

import {MyHttpService} from './utility/service/myhttp.service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    IndexPage,
    UserCenterPage,
    FilmPage,
    DetailPage,
    LoginPage,
    HotPage,
    CommentAllPage,
    SettingPage,
    RegisterPage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    HomePage,
    IndexPage,
    UserCenterPage,
    FilmPage,
    DetailPage,
    LoginPage,
    HotPage,
    CommentAllPage,
    SettingPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyHttpService
  ]
})
export class AppModule {}
