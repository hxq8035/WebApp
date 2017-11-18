import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
/**
 * Generated class for the CommentAllPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-comment-all',
  templateUrl: 'comment-all.html',
})
export class CommentAllPage {
  nid;
  commentAll;
  cNumAll;
  uid;
  myComment;

  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
    let nid:number = this.navParams.get('nid');
    this.nid=nid;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentAllPage');
    this.loadAll();
  }
  ionViewDidEnter(){
    this.uid=sessionStorage.getItem('uid');
  }

  loadAll(){
    this.myHttp
    .sendRequest("http://localhost/data/news/commentAll.php?nid="+this.nid)
    .subscribe((result:any)=>{
      if(result){
       this.commentAll=result.data;
       this.cNumAll=result.count;
      }
    })
  }

  pad0(val){
    return val<10?(val="0"+val):val;
  }
  format(date){
    
    var y=date.getFullYear();
    var M=this.pad0(date.getMonth()+1);
    var d=this.pad0(date.getDate());
    var h=this.pad0(date.getHours());
    var m=this.pad0(date.getMinutes());
    var s=this.pad0(date.getSeconds());
    return y+"-"+M+"-"+d+" "+h+":"+m+":"+s

}

  writeComment(content){
    if(this.uid){
        var timer=this.format(new Date());
        this.myHttp.sendRequest("http://localhost/data/news/insert.php?nid="+this.nid+"&uid="+this.uid+"&time="+timer+"&content="+content)
        .subscribe((result:any)=>{
          if(result.code==200){
            this.myHttp.showToast('评论成功');
            this.myComment="";
            this.loadAll();
          }else{
            this.myHttp.showToast('评论失败！');
          }
        })
    }else{
      this.navCtrl.push(LoginPage);
    }
  }
  
}
