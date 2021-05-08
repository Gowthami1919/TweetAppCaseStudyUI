import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { TweetService } from 'src/app/service/tweet.service';

@Component({
  selector: 'app-add-new-tweet',
  templateUrl: './add-new-tweet.component.html',
  styleUrls: ['./add-new-tweet.component.css']
})
export class AddNewTweetComponent implements OnInit {

  constructor(private service:SharedService, private datepipe: DatePipe,private tweetservice:TweetService,private router:Router) { 
    this.user_details=this.service.sharedCustomer;
    
  }

  @Input() user_details:any;
  form: FormGroup;
  date:Date;
  ngOnInit(): void {

    
    this.form = new FormGroup({
      UserTweets: new FormControl('',[Validators.required, Validators.maxLength(144)]),
      UserId: new FormControl('',),
      UserName: new FormControl('',),
      CreatedDate: new FormControl((new Date())),
      Likes: new FormControl('',),
      Dislikes: new FormControl('',),
    });
    
    console.log(this.user_details);
  }

  hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  

  onSubmit()
{
  this.date=new Date();
  let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  this.form.value.UserId=this.user_details.emailId;
  this.form.value.UserName=this.user_details.firstname;
  this.form.value.CreatedDate=latest_date;
  this.form.value.Likes=0;
  this.form.value.Dislikes=0;
  console.log(this.form.value);
  this.tweetservice.addTweet(this.form).subscribe(
    data => {
      console.log(data);
        this.router.navigateByUrl("/viewMyTweets");
    }
  );
}

}

