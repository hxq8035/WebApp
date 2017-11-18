import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {DetailPage} from '../detail/detail'
/**
 * Generated class for the FilmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-film',
  templateUrl: 'film.html',
})
export class FilmPage {
  topSaleItems:Array<any> = [];
  soonShowItems:Array<any> = [];
  classicItems:Array<any> = [];
  film='topSale';
  actors:Array<any> = [];

  //构造函数是指 当前的类 被调用时 会自动调用的方法
  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get("film")){
      this.film=this.navParams.get("film");
    }
    this.loadTopData();
    this.loadSoonData();
    this.loadClassicData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmPage');
  }

  jumpToDetail(index,which){
    //跳转到详情页，同时将产品的id发给detail
    this.navCtrl.push(
      DetailPage,
      {id:which[index].fid}
      );
  }



  loadTopData(){
    this.myHttp
    .sendRequest('http://localhost/data/movies.php?subnav=seq_top_show')
    .subscribe((result:any)=>{
      if(result){//如果服务器端返回的result有有效值，保存数据
        this.topSaleItems=result.data;
        this.actors=result.actors;
      }
    });
    return new Promise(resolve=>resolve());
  }

  loadSoonData(){
    this.myHttp
    .sendRequest('http://localhost/data/movies.php?subnav=seq_soon_show')
    .subscribe((result:any)=>{
      if(result){//如果服务器端返回的result有有效值，保存数据
       this.soonShowItems=result.data;
      }
    })
  }
  loadClassicData(){
    this.myHttp
    .sendRequest('http://localhost/data/movies.php?subnav=seq_classic')
    .subscribe((result:any)=>{
      if(result){//如果服务器端返回的result有有效值，保存数据
       this.classicItems=result.data;
      }
    })
  }
}
