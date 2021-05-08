import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { TweetService } from 'src/app/service/tweet.service';

@Component({
  selector: 'app-show-user-tweets',
  templateUrl: './show-user-tweets.component.html',
  styleUrls: ['./show-user-tweets.component.css']
})
export class ShowUserTweetsComponent implements OnInit {

  loggedInUserList:any
  tweetList:any
  tweetId:any
  likesCount:any
  searchText:any;
  userId:any;

  constructor(private tweetService:TweetService,private sharedservice:SharedService, private route:Router) { 
    this.loggedInUserList=sharedservice.sharedCustomer
    this.userId=this.loggedInUserList.emailId;
    
  }

  ngOnInit(): void {
    this.getAllOtherUserTweetList(this.loggedInUserList.emailId);
    
  }

  getAllOtherUserTweetList(userId:any){
    this.tweetService.getOtherUserTweets(userId).subscribe(
      data =>{
          this.tweetList=data;
          console.log(this.tweetList);
      }
    )
  }

  dislike(){
    console.log("dislike");
  }

  like(tweetId:any){
    console.log(tweetId)
    this.tweetService.getLikes(tweetId,this.userId).subscribe(
      data =>{
        console.log(data);
        this.tweetList=data;
          console.log(this.tweetList.id);
      }
    )
    
  }

  comment(tweetId:any,userId:any){
    console.log(tweetId);
    console.log(userId);
    this.loggedInUserList=this.sharedservice.sharedCustomer
    this.route.navigateByUrl('comment/'+tweetId);
  }


}
