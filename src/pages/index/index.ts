import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {MyHttpService} from '../../app/utility/service/myhttp.service'
import {DetailPage} from '../detail/detail'
import {HotPage} from '../hot/hot'
import {FilmPage} from '../film/film'
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  carouselItems:Array<any> = [];
  topSaleItems:Array<any>=[];
  soonShowItems:Array<any>=[];
  newsItems:Array<any>=[];
  imgs:Array<any>=[];
  

  constructor(private myHttp:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    this.loadCarouselData();
    this.loadFloor();
    this.loadNews();
  }
  loadCarouselData(){
    this.myHttp
    .sendRequestT('http://localhost/data/index/banner.php')
    .subscribe((result:any)=>{
      if(result){//如果服务器端返回的result有有效值，保存数据
        this.carouselItems = result;
      }
    })
  }
  loadFloor(){
    this.myHttp
    .sendRequest('http://localhost/data/index/floors.php')
    .subscribe((result:any)=>{
      if(result){//如果服务器端返回的result有有效值，保存数据
        this.topSaleItems = result.topShow;
        this.soonShowItems = result.soonShow;
      }
    })
  }
  

  jumpToDetail(index,which){
    //跳转到详情页，同时将产品的id发给detail
    this.navCtrl.push(
      DetailPage,
      {id:which[index].fid}
      );
  }

  jumpToFilm(fi){
    this.navCtrl.push(FilmPage,{film:fi});
    // this.navCtrl.parent.select(1);
  }

  loadNews(){
    this.myHttp
    .sendRequest('http://localhost/data/hot/hot_news.php')
    .subscribe((result:any)=>{
      if(result){//如果服务器端返回的result有有效值，保存数据
        this.newsItems=result;
        for(let news of result){
          let contents=news.content.split('%');
          this.imgs[news.nid]=[];
          for(let con of contents){
            if(con.indexOf('i')==0){
              this.imgs[news.nid].push(con);
            }
          }
        }
      }
    })
  }

  jumpToNews(index){
    this.navCtrl.push(HotPage,{nid:this.carouselItems[index].href.slice(14)});
  }
  jumpToNewsAll(index){
    this.navCtrl.push(HotPage,{nid:this.newsItems[index].nid});
  }
}
