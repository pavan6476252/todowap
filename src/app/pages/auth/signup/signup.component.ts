import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../core/services/auth.service';
import { IAuthSignupReponse } from '../../../@types/auth';
@Component({
    selector: 'app-auth-signup',
    templateUrl: './signup.component.html',
    imports:[RouterModule ,ReactiveFormsModule]

})
export class SignUpComponent {
    signUpForm ?: FormGroup;
    constructor(private authService:AuthService,private router :Router)
{
    this.signUpForm = new FormGroup({
        userName:new FormControl('',{validators:[Validators.required]}),
        email:new FormControl('',{validators:[Validators.required,Validators.email]}),
        password:new FormControl('',{validators:[Validators.required,Validators.minLength(8)]}),
        confirmPassword:new FormControl('',{validators:[Validators.required,Validators.minLength(8)]}),
    })
}
    
    signup(){
        if(this.signUpForm?.valid){

         const{userName, email, password, confirmPassword} = this.signUpForm.value;
         console.log(userName, email, password, confirmPassword)
        // return ;
        this.authService.signup({ name: userName, email, password }).subscribe({next:(res)=>{
            console.log("SignUp :", res)
          
            setTimeout(()=>{
                this.router.navigate(['/auth/sign-in'])
            },500)
        },error:(err:IAuthSignupReponse)=>{
            console.log("error" , err)
        }}) 
    }
    }
    
}
