import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  authurl = 'http://localhost:50465/'
  loggedInUser:any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  constructor(private http: HttpClient) { }

  authenticate(Username:any,password:any)
  {
    console.log("in authenticate")
    let body = Username+"/"+password
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    var result= this.http.get(this.authurl+"UserLogin/"+body,options)
    if(result != null){
      this.loggedIn.next(true);
    }
    return result;
  }

  register(user:any)
  {
    let body = JSON.stringify(user.value)
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in register");
    return this.http.post(this.authurl+"UserRegister",body,options)
  }

  checkEmailId(emailId:string)
  {
    let body = emailId;
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in register");
    return this.http.get<any>(this.authurl+"UserExists/"+body,options)
  }

  forgotPasswordEmailId(userId:any){
    let body = userId;
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in register");
    return this.http.get<any>(this.authurl+"ForgotPasswordEmailId/"+body,options)
  }

  forgotPassword(userId:any,password:any){
    let body = userId+"/"+password;
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in forgotPassword");
    return this.http.put<any>(this.authurl+"ForgotPassword/"+body,options)
  }

  resetPassword(userId:any,oldPassword:any,newPassword:any){
    let body = userId+"/"+oldPassword+"/"+newPassword;
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'responseType':'text' })
    let options = { headers: header }
    console.log("in forgotPassword");
    return this.http.put<any>(this.authurl+"resetpassword/"+body,options)
  }
  onLogout(){
    this.loggedInUser=null;
  }
}
