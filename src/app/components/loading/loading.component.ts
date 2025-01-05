import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ILoadingState, LoadingSerivce } from "./loading.service";
import { CommonModule, NgIf } from "@angular/common";

@Component({
    selector: 'app-loading-indicator',
    imports: [NgIf, CommonModule],
    templateUrl: './loading.component.html',
    styles: `
    .progress {
    animation: progress 1s infinite linear;
    }

    .left-right {
        transform-origin: 0% 50%;
    }
        @keyframes progress {
        0% {
            transform:  translateX(0) scaleX(0);
        }
        40% {
            transform:  translateX(0) scaleX(0.4);
        }
        100% {
            transform:  translateX(100%) scaleX(0.5);
        }
    }`
})
export class LoadingComponent implements OnInit {
    state = new Observable<ILoadingState>();

    constructor(private loadingService: LoadingSerivce) {

    }

    ngOnInit(): void {
        this.state = this.loadingService.getState();
    }

}