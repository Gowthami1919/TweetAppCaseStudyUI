import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { TweetService } from 'src/app/service/tweet.service';

@Component({
  selector: 'app-view-my-tweets',
  templateUrl: './view-my-tweets.component.html',
  styleUrls: ['./view-my-tweets.component.css']
})
export class ViewMyTweetsComponent implements OnInit {

  constructor(private tweetService:TweetService,private sharedservice:SharedService, private router:Router, private datepipe:DatePipe) {
    this.userList=sharedservice.sharedCustomer
    
   }

  ngOnInit(): void {
    this.getAllTweets(this.userList.emailId);
  }
  userList:any;
  tweetList:any;
  createdDate:any;

  getAllTweets(userId:any){
     this.tweetService.getUserTweets(userId).subscribe(
       data=>{
         console.log(data);
          this.tweetList=data;
          this.createdDate=this.datepipe.transform(this.tweetList.createdDate, 'yyyy-MM-dd');
          this.tweetList.createdDate=this.createdDate
          console.log(this.tweetList.createdDate);
        }
     )
      }

     viewMyComment(tweetId:any){
          this.router.navigateByUrl('/viewmycomment/'+tweetId)
     }
  }


