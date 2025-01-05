import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { catchError, map } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.checkAuthentication()
    }

    private checkAuthentication() {
        return this.authService.isUserHaveTokens().pipe(map(check => {
            if (check) {
                return true;
            }
            this.router.navigate(["/auth"])
            return false;
        }), catchError(() => {
            this.router.navigate(['/auth'])
            return [false];
        }))
    }
}