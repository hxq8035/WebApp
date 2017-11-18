import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'
import {CommentAllPage} from '../comment-all/comment-all'
/**
 * Generated class for the HotPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hot',
  templateUrl: 'hot.html',
})
export class HotPage {
  nid;
  newsItems:Array<any>=[];
  contents:Array<any>=[];
  comment:Array<any>=[];
  cNum;
  uid;
  myComment;
  commentAllPage;


  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
    let nid:number = this.navParams.get('nid');
    this.nid = nid;
    this.uid=sessionStorage.getItem('uid');
    this.commentAllPage=CommentAllPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotPage');
    this.loadData();
    this.loadComment(1);
  }

  loadData(){
    this.myHttp
    .sendRequest('http://localhost/data/news/news.php?nid='+this.nid)
    .subscribe((result:any)=>{
      if(result){//如果服务器端返回的result有有效值，保存数据
        this.newsItems=result[0];
        this.contents=result[0].content.split('%');
      }
    })
  }

  loadComment(pno){
    this.myHttp
    .sendRequest("http://localhost/data/news/comment.php?nid="+this.nid+"&pno="+pno)
    .subscribe((result:any)=>{
      if(result){
       this.comment=result.data;
       this.cNum=result.count;
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
            this.loadComment(1);
          }else{
            this.myHttp.showToast('评论失败！');
          }
        })
    }else{
      this.navCtrl.push(LoginPage);
    }
  }
  
}
