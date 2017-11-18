import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserCenterPage} from '../user-center/user-center'

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  isUserLogin=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
   ionViewWillEnter(){
    if(sessionStorage.getItem('uid')){
      this.isUserLogin=true;
    }
  }

   logOut(){
    sessionStorage.clear();
    this.isUserLogin=false;
    this.navCtrl.pop();

  }

}
