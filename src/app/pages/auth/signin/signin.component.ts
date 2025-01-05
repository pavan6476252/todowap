import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IAuthLoginReponse } from '../../../@types/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './signin.component.html',
    imports: [RouterModule,ReactiveFormsModule]

})
export class SignInComponent {
     loginForm ?: FormGroup;
        constructor(private authService:AuthService,private router :Router)
    {
        this.loginForm = new FormGroup({
            
            email:new FormControl('',{validators:[Validators.required,Validators.email]}),
            password:new FormControl('',{validators:[Validators.required,Validators.minLength(8)]}),
            
        })
    }
        
        singnIn(){
            if(this.loginForm?.valid){
    
             const{  email, password} = this.loginForm.value;
             console.log(  email, password )
            // return ;
            this.authService.login({   email, password }).subscribe({next:(res)=>{
                console.log("Login :", res)
                
                setTimeout(()=>{
                    this.router.navigate(['/'])
                },500)
            },error:(err:IAuthLoginReponse)=>{
                console.log("error" , err)
            }}) 
        }
        }
        
}
