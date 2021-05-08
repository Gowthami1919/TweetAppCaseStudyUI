import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {AuthenticateService} from 'src/app/service/authenticate.service';
import {default as _rollupMoment} from 'moment';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { Register } from './register';


const moment = _rollupMoment || _moment;

// export class CrossFieldErrorMatcher implements ErrorStateMatcher {
//   constructor(private name:string){}  //<--add a constructor
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid && (control.dirty || control.touched));
//     const invalidParent = !!(control && (control.parent.hasError('name')));
//     return ((invalidCtrl || invalidParent));
//   }
// }

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isEmailExist: boolean
  passwordNotSame:boolean
 alreadyexists:boolean=false;
 debouncer: any;
 img:string;

  constructor(private formBuilder: FormBuilder,private router:Router,private service:AuthenticateService) { }

  form: FormGroup;
  ngOnInit(): void { 
    this.form = new FormGroup({
      Firstname: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      LastName: new FormControl('',[Validators.required]),
      Gender: new FormControl('',[Validators.required,Validators.minLength(6) ]),
      Dob: new FormControl((new Date()).toISOString(),[Validators.required]),
      EmailId: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      Password: new FormControl('',[Validators.required]),
      Imgname:new FormControl('',[Validators.required] )
    });
    // this.addValidator();
  }

  genders = [
    {id:'male',gender:'Male'},
    {id:'female' ,gender:'Female'},
    {id:'others',gender:'others'}
  ];

  selectedValue:string

  checkUsername(emailId:string):any {
    
      this.service.checkEmailId(emailId).subscribe(
        data => 
        {
          console.log(data);
          
            if(data==emailId){
              this.isEmailExist=true;
              
            }
            else{
              this.isEmailExist=false
            }
            console.log(this.isEmailExist);
        }
      )     

  ;
}
   register=new Register();

   fileEvent(event :any){
    this.img= event.target.files[0].name;
  }
 
   

  hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  onConfirmPassword(event:any){
    if(event.target.value != this.form.value['Password'])
    {
      console.log(event.target.value );
      console.log(this.form.value['Password']);
      this.passwordNotSame = true;
    }
    else
    {
      this.passwordNotSame = false;
    }
    console.log(this.passwordNotSame);
  }

  onPassword(event:any,password:string){
    this.passwordNotSame = true;
    if(event.target.value != password)
    {
      this.passwordNotSame = true;
    }
    else
    {
      this.passwordNotSame = false;
    }
  }

  // onEmailChange(emailId:string)
  // {
  //     this.service.checkEmailId(this.form.value.EmailId).subscribe(
  //       data => 
  //       {
  //         console.log(data);
  //         if (data!=null)
  //           {
  //             this.isEmailExist = true
  //             console.log(data);
  //           }
            
  //       }
  //     )
      
      
  // };
  

  // onEmailChange(control: AbstractControl){
  //   const val = control.value;
    
  //     return  this.service.checkEmailId(val.EmailId).pipe(
  //       map(res => {
  //         status='Username Exists'
  //         return status === res['status'] ? { alreadyExist: true } : null;
  //       }),
  //     );
  // }

  

  onSubmit()
  {
      this.form.value.Dob=moment().format('YYYY-MM-DD');
      console.log(this.form.value);
      this.form.value.Imgname= this.img;
      this.service.register(this.form).subscribe(
        data => {
          console.log(data);
          if(data['status'] == "Registered succesfully")
          {
            this.router.navigateByUrl("/login")

          }
          else if(data['status'] == "You have the account already please login")
          {
            
          }
          
        }
      )
    }
}
