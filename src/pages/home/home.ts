import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IndexPage} from '../index/index'
import {UserCenterPage} from '../user-center/user-center'
import {FilmPage} from '../film/film'
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  indexPage;
  filmPage;
  userCenterPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.indexPage=IndexPage;
    this.filmPage=FilmPage;
    this.userCenterPage=UserCenterPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
