import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  filmId;
  banner;
  isClicked=false;
  isDown=false;
  actor;
  director;
  actors;
  isView=false;
  comment;
  isUserLogin;



  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
    let myId:number = this.navParams.get('id');
    this.filmId = myId;
    this.loadData(myId);
    this.loadComment(myId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  ionViewWillEnter(){
    this.checkUserLogin();
  }

  checkUserLogin(){
    if(sessionStorage.getItem('uid')){
      this.isUserLogin=true;
    }
  }
  loadData(id:number){
    this.myHttp
    .sendRequest("http://localhost/data/movie_detail/movie_detail.php?mid="+id)
    .subscribe((result:any)=>{
      if(result){
        this.banner=result.banner;
        this.actor=result.actor;
        this.director=result.director;
        this.actors=this.actor.concat(this.director);
       
      }
    })
  }

  loadComment(id:number){
    this.myHttp
    .sendRequest("http://localhost/data/movie_detail/comment.php?mid="+id)
    .subscribe((result:any)=>{
      if(result){
       this.comment=result;
     
      }
    })
  }


  handleMore(e){
    if(!this.isClicked){
      document.getElementById("detail").className="";
     this.isDown=true;
      this.isClicked=true;
    
    }else{
      document.getElementById("detail").className="detail";
      this.isClicked=false;
      this.isDown=false;
    }
    
  }

  wannerView(){
    if(this.isUserLogin){
      this.isView=!this.isView;
    }else{
    this.navCtrl.push(LoginPage);
    }
    
  }

}
