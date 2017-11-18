import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userName:string="";
  userPwd:string = "";
  userPhone;
  userEamil;
  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  doRegister(){
    if(this.userName!=""&&this.userPwd!=""){
      this.myHttp
      .sendRequest("http://localhost/data/register/vali.php?uname="+this.userName)
      .subscribe((result:any)=>{
        
        if(result){
          if(result.code == 200){
           
              this.myHttp
              .sendRequest("http://localhost/data/register/register.php?uname="+this.userName+"&upwd="+this.userPwd+"&phone="+this.userPhone)
              .subscribe((result:any)=>{
                
                if(result){
                  if(result.code == 200){
                    this.myHttp.showToast('注册成功');
                    this.navCtrl.pop();
                  }
                  else {
                    this.myHttp.showToast('注册失败');
                  }
                }
              })
          }
          else {
            this.myHttp.showToast('用户名已存在');
          }
        }
      })
    }else{
      this.myHttp.showToast('请输入用户名或密码');
    }
    
  }

}
