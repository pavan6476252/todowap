import { Injectable } from "@angular/core";
import { IList } from "../interfaces/list.interface";
import { MOCK_LISTS } from "../mock-data/list.mock";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private lists: IList[] = MOCK_LISTS;

    private listSubject = new BehaviorSubject<IList[]>(this.lists);

    // it provides the observability of this data to other components
    lists$: Observable<IList[]> = this.listSubject.asObservable();

    getList(): Observable<IList[]> {
        return this.lists$;
    }

    async addList(newList: IList): Promise<void> {
        this.lists.push(newList);
        // Emitting updated List
        this.listSubject.next([...this.lists])

        await this.saveToLocalStorage()
    }

    private async saveToLocalStorage():Promise<void> {
        await localStorage.setItem('list_items', await JSON.stringify(this.lists))
    }
}