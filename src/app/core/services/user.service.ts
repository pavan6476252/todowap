import { Injectable } from "@angular/core";
import { IUser } from "../../@types/user";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
    providedIn:'root'
})
export class UserService{
    private currentUserSubject = new BehaviorSubject<IUser| null>(null)
    private currentUser$ : Observable<IUser| null> = this.currentUserSubject.asObservable();


    constructor(private apiService: ApiService) {
            this.fetchProfileInfo()
    }

    private fetchProfileInfo(){
        return this.apiService.get<IUser>('user/me').subscribe((user)=>{
            this.currentUserSubject.next(user.data);
        });
    }

    getProfileInfo():Observable<IUser|null>{
        return this.currentUser$;
    }
}