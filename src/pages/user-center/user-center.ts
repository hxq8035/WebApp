import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login'
import {SettingPage} from '../setting/setting'
/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  isUserLogin=false;
  uname;
  avatar;
  loginPage;
  settingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loginPage=LoginPage;
    this.settingPage=SettingPage;
    this.isUserLogin=this.navParams.get("isUserLogin");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
  }
  ionViewWillEnter(){
    this.checkUserLogin();
  }

  checkUserLogin(){
    if(sessionStorage.getItem('uid')){
      this.isUserLogin=true;
      this.uname=sessionStorage.getItem('uname');
      this.avatar=sessionStorage.getItem('avatar');
    }else{
      this.isUserLogin=false;
    }
  }

}
