import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotPage } from './hot';

@NgModule({
  declarations: [
    HotPage,
  ],
  imports: [
    IonicPageModule.forChild(HotPage),
  ],
  exports: [
    HotPage
  ]
})
export class HotPageModule {}
