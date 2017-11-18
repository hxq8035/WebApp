import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {RegisterPage} from '../register/register'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userName:string="";
  userPwd:string = "";
  registerPage;
  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
    this.registerPage=RegisterPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  doLogin(){
    this.myHttp
    .sendRequest("http://localhost/data/header/login.php?uname="+this.userName+"&upwd="+this.userPwd)
    .subscribe((result:any)=>{
      
      if(result){
        if(result.code == 200){
          this.myHttp.showToast('登录成功');
          sessionStorage.setItem('uid',result.uid);
          sessionStorage.setItem('uname',result.uname);
          sessionStorage.setItem('avatar',result.avatar);
          this.navCtrl.pop();
        }
        else if(result.code == 201){
          this.myHttp.showToast('登录失败');
          //在登录失败 清空之前输入的信息
          this.userName = "";
          this.userPwd = "";
        }
      }
    })
  }

}
