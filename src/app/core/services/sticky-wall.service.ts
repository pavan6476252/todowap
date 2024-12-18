import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IStickyWall } from "../interfaces/sticky-wall.interface";
import { MOCK_STICKY_WALLS } from "../mock-data/sticky-wall.mock";

@Injectable({
    providedIn: 'root'
})
export class StickyWallService {
    private stickyWall: IStickyWall[] = MOCK_STICKY_WALLS;

    private stickyWallSubject = new BehaviorSubject<IStickyWall[]>(this.stickyWall);

    // it provides the observability of this data to other components
    lists$: Observable<IStickyWall[]> = this.stickyWallSubject.asObservable();

    getStickyWalls(): Observable<IStickyWall[]> {
        return this.lists$;
    }

    async addStickyWall(newList: IStickyWall): Promise<void> {
        this.stickyWall.push(newList);
        // Emitting updated stickyWall 
        this.stickyWallSubject.next([...this.stickyWall])

        await this.saveToLocalStorage()
    }

    private async saveToLocalStorage(): Promise<void> {
        await localStorage.setItem('sticky_wall_notes', await JSON.stringify(this.stickyWall))
    }
}