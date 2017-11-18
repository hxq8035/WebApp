import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentAllPage } from './comment-all';

@NgModule({
  declarations: [
    CommentAllPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentAllPage),
  ],
  exports: [
    CommentAllPage
  ]
})
export class CommentAllPageModule {}
