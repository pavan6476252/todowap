import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs'; 
import { ApiService } from './api.service';
import { IAPIResposne } from '../../@types/api-response'; 
import { ITag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private listsSubject = new BehaviorSubject<ITag[]>([]);
 tags$: Observable<ITag[]> = this.listsSubject.asObservable();

  constructor(private apiService: ApiService) {}
 
  fetchTags() {
    return this.apiService.get<ITag[]>(`tags`).pipe(
      tap((res)=>{
        if(res && res.data)
        this.listsSubject.next([...res.data])
      })
    )
  }

   
  getTags(): Observable<ITag[]> {
    return this.tags$;
  }

  
  addTag(newTag: ITag): Observable<IAPIResposne<ITag>> {
    return  this.apiService.post<ITag>(`tags`, newTag).pipe(
      tap((addedTag) => { 
        const currentTags = this.listsSubject.value;
        this.listsSubject.next([...currentTags, addedTag.data]);
      })
    );
  }

  updateTag(updatedTag: ITag): Observable<IAPIResposne<ITag>> {
    return  this.apiService.put<ITag>(`tags/${updatedTag._id}`, updatedTag).pipe(
      tap((addedTag) => { 
        const currentTags = this.listsSubject.value.map((list)=>{
            if(list._id===addedTag.data._id){
                return addedTag.data;
            }
            return list;
        });
        this.listsSubject.next([...currentTags]);
      })
    );
  }

  deleteTag(id: string): Observable<IAPIResposne<null>> {
    return  this.apiService.delete<null>(`tags/${id}`).pipe(
      tap((resposne) => { 
        if(resposne ){
            const filteredTag = this.listsSubject.value.filter((list)=>list._id!==id)   
            this.listsSubject.next([...filteredTag]);
        }
      })
    );
  }
}
