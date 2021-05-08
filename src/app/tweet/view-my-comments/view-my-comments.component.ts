import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { TweetService } from 'src/app/service/tweet.service';

@Component({
  selector: 'app-view-my-comments',
  templateUrl: './view-my-comments.component.html',
  styleUrls: ['./view-my-comments.component.css']
})
export class ViewMyCommentsComponent implements OnInit {
  commentList:any;
  tweetId:any;
  loggedUserDetails:any;
 constructor(private router:Router, private tweetService:TweetService,
   private actRoute:ActivatedRoute,private sharedservice:SharedService,public dialog: MatDialog ) { }

 ngOnInit(): void {
   this.tweetId = this.actRoute.snapshot.params.tweetId;
   console.log(this.tweetId);
   this.getComments();
   this.loggedUserDetails=this.sharedservice.sharedCustomer
 }

 form: FormGroup = new FormGroup({
   comment: new FormControl('',[Validators.required, Validators.maxLength(144)]),
   TweetId: new FormControl('',),
   UserId: new FormControl('',),
 });
 
 addComment(){
  this.router.navigateByUrl('/login');
  this.tweetService.addComment
 }

 getComments(){
   this.tweetService.getComments(this.tweetId).subscribe(
     data=>{
       this.commentList=data;
       console.log(this.commentList);
     }
   )

 }

 


}
