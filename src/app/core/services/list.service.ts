import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { IList } from '../interfaces/list.interface'; 
import { ApiService } from './api.service';
import { IAPIResposne } from '../../@types/api-response';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private listsSubject = new BehaviorSubject<IList[]>([]);
  lists$: Observable<IList[]> = this.listsSubject.asObservable();

  constructor(private apiService: ApiService) {}
 
  fetchLists() {
    return this.apiService.get<IList[]>(`lists`).pipe(
      tap((res)=>{
        if(res && res.data)
        this.listsSubject.next([...res.data])
      })
    )
  }

   
  getList(): Observable<IList[]> {
    return this.lists$;
  }

  
  addList(newList: IList): Observable<IAPIResposne<IList>> {
    return  this.apiService.post<IList>(`lists`, newList).pipe(
      tap((addedList) => { 
        const currentLists = this.listsSubject.value;
        this.listsSubject.next([...currentLists, addedList.data]);
      })
    );
  }

  updateList(updatedList: IList): Observable<IAPIResposne<IList>> {
    return  this.apiService.put<IList>(`lists/${updatedList._id}`, updatedList).pipe(
      tap((addedList) => { 
        const currentLists = this.listsSubject.value.map((list)=>{
            if(list._id===addedList.data._id){
                return addedList.data;
            }
            return list;
        });
        this.listsSubject.next([...currentLists]);
      })
    );
  }
  deleteList(id: string): Observable<IAPIResposne<null>> {
    return  this.apiService.delete<null>(`lists/${id}`).pipe(
      tap((resposne) => { 
        if(resposne ){
            const filteredList = this.listsSubject.value.filter((list)=>list._id!==id)   
            this.listsSubject.next([...filteredList]);
        }
      })
    );
  }
}
