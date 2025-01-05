import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, finalize, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing: boolean = false; 
    constructor(private authService: AuthService,private router:Router) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.authService.getAccessToken()}`)
        });

        return next.handle(clonedRequest).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err && err.status === 498 && !this.isRefreshing) { 
                    console.log(498)

                    this.isRefreshing = true
                    return this.handle498Response(req, next);
                }else if(err.status ==401){
                    console.log(401)
                    this.isRefreshing = false;
                    // this.authService.logout();
                    // this.router.navigate(['/auth'])
                    return throwError(() => err);
                }
                return throwError(() => err);

            })
        );
    }

    private handle498Response(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.refreshTokens().pipe(
            switchMap((response) => { 
                this.authService.storeAccessToken(response.data.accessToken);
                this.authService.storeRefreshToken(response.data.refreshToken);

                // Clone the original request and add the new access token
                const clonedRequest = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${this.authService.getAccessToken()}`)
                });
                console.log("refreshing tokens") 
                return next.handle(clonedRequest);
            }),
            catchError((err) => {
                console.log("Error while refreshing tokens",err)
                
                // If refresh token fails, log out the user and redirect to login
                // this.authService.logout();
                this.router.navigate(['/auth']);
                return throwError(() => err);
            }),)
    }
}
