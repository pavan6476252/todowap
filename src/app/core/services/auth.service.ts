import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { IAuthLoginDetails, IAuthLoginReponse, IAuthRefreshTokenReponse, IAuthSignUpDetails, IAuthSignupReponse } from "../../@types/auth";
import { BehaviorSubject, catchError, map, Observable, of, retry, throwError } from "rxjs";
import { IUser } from "../../@types/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
   
    constructor(private apiService: ApiService) {
            
    }
    
    storeAccessToken(token: string) {
        return localStorage.setItem('accessToken', token);
    }
    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    storeRefreshToken(token: string) {
        return localStorage.setItem('refreshToken', token);
    }
    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    
    isUserHaveTokens():Observable<boolean>{
        return of( this.getAccessToken() !==null && this.getRefreshToken()!==null)
    }
    refreshTokens() {
        return this.apiService.post<IAuthRefreshTokenReponse>('auth/refresh-tokens', { refreshToken: this.getRefreshToken() })
    }

    signup(data:IAuthSignUpDetails){
        return this.apiService.post<IAuthSignupReponse>('auth/signup',data).pipe(catchError(this.handleErrorResposne<IAuthSignupReponse>))
    }
    login(data:IAuthLoginDetails){
        return this.apiService.post<IAuthLoginReponse>('auth/login',data).pipe(
            map((val)=>{
                console.log(val)
                this.storeAccessToken(val.data.accessToken);
                this.storeRefreshToken(val.data.refreshToken);
                return val
            }),
            catchError(this.handleErrorResposne<IAuthLoginReponse>))
    }

    private handleErrorResposne<T> (err:HttpErrorResponse):Observable<T>{
            return throwError(()=>err.error as T)
    }

    logout():Observable<boolean>{
        localStorage.clear();
        return of(true);
    }
}