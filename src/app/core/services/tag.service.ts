import { Injectable } from "@angular/core";
import { ITag } from "../interfaces/tag.interface";
import { MOCK_TAGS } from "../mock-data/tag.mock";
import { BehaviorSubject, Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class TagService {
    private tags: ITag[] = MOCK_TAGS;

    private tagsSubject = new BehaviorSubject<ITag[]>(this.tags);

    // creating an observable for other dependent services and components  

    tags$: Observable<ITag[]> = this.tagsSubject.asObservable();

    getTags(): Observable<ITag[]> {
        return this.tags$;
    }

    async addTag(newTag: ITag): Promise<void> {
        this.tags.push(newTag);
        // emitting updated tags list
        this.tagsSubject.next([...this.tags])
        await this.saveToLocalStorage()
    }

    private async saveToLocalStorage(): Promise<void> {
        await localStorage.setItem('tag_items', await JSON.stringify(this.tags))
    }

}