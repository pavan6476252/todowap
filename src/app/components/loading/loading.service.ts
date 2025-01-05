import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export type ILoadingState= {loading:boolean,message:string};

@Injectable({
    providedIn:'root'
 })
 export class LoadingSerivce{
    private loading$ =new BehaviorSubject<ILoadingState>({loading:false,message:''});

    getState():Observable<ILoadingState>{
        return this.loading$.asObservable()
    }

    setState(state: ILoadingState){
        if(this.loading$.value.loading && !state.loading)
             this.loading$.next(state);
            else
            this.loading$.next(state);
    }

 }