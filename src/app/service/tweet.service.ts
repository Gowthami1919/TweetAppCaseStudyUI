import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  authurl = 'http://localhost:50465/'
  usersearch:any;

  constructor(private http: HttpClient) { }

  GetAllUserandTweetList()
  {
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in GetAllUserandTweetList");
    return this.http.get<any>(this.authurl+"GetAllUserandTweetList",options)
  }

  addTweet(tweet:any)
  {
    let body = JSON.stringify(tweet.value)
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in GetAllUserandTweetList");
    return this.http.post(this.authurl+"AddNewTweet",body,options)
  }

  addComment(comments:any, tweetId:any){

    let body = JSON.stringify(comments.value);
    console.log(body);
   let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in addTweetComments");
    return this.http.post<any>(this.authurl+"addTweetComments/"+tweetId,body,options)
  }


  getUserTweets(userId:any){
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in GetAllUserandTweetList");
    return this.http.get<any>(this.authurl+"ViewUserAllTweets/"+userId,options)
  }

  
  getOtherUserTweets(userId:any){
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in GetAllUserandTweetList");
    return this.http.get<any>(this.authurl+"ViewOtherUsersAllTweets/"+userId,options)
  }

  getLikes(tweetId:any,userId:any){
    let body=tweetId+"/"+userId
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in GetAllUserandTweetList");
    return this.http.get<any>(this.authurl+"TweetLike/"+body,options);
  }

  getComments(tweetId:any){

    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in GetAllUserandTweetList");
    return this.http.get<any>(this.authurl+"getTweetComments/"+tweetId,options);
  }

  
}
