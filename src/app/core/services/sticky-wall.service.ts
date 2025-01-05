import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { IStickyWall } from "../interfaces/sticky-wall.interface";
import { MOCK_STICKY_WALLS } from "../mock-data/sticky-wall.mock";
import { ApiService } from "./api.service";
import { LoadingSerivce } from "../../components/loading/loading.service";
import { IAPIResposne } from "../../@types/api-response";
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class    StickyWallService {
    // private stickyWall: IStickyWall[] = MOCK_STICKY_WALLS;

    // private stickyWallSubject = new BehaviorSubject<IStickyWall[]>(this.stickyWall);
    private stickyWallSubject = new BehaviorSubject<IStickyWall[]>([]);

    // it provides the observability of this data to other components
    lists$: Observable<IStickyWall[]> = this.stickyWallSubject.asObservable();

    constructor(private apiService: ApiService, private loadingService: LoadingSerivce) {

    }
    fetchStickyWall(id: string): Observable<IAPIResposne<IStickyWall>|null> {
        return this.apiService.get<IStickyWall>(`sticky-wall/${id}`).pipe(
          catchError(error => {
            console.error(error);
            return of(null);  
          })
        );
      }
    
      fetchStickyWalls(): Observable<IAPIResposne<IStickyWall[]>> {
        return this.apiService.get<IStickyWall[]>('sticky-wall').pipe(
          tap(data => this.stickyWallSubject.next(data.data)),
          catchError(error => {
            console.error(error);
            return [];
          })
        );
      }


    getStickyWalls(): Observable<IStickyWall[]> {
        return this.lists$;
    }

    addStickyWall(newWall: IStickyWall) {
        return this.apiService.post<IStickyWall>('sticky-wall', newWall).pipe(
          switchMap(() => this.apiService.get<IStickyWall[]>('sticky-wall')),
          tap(walls => this.stickyWallSubject.next(walls.data)),
          catchError(error => {
            console.error('Error adding sticky wall:', error);
            const data :IStickyWall[] = []
            return data
          })
        );
      }

      updateStickyWall(id: string, newWall: Partial<IStickyWall>): Observable<IAPIResposne<IStickyWall>|null> {
        this.loadingService.setState({ loading: true, message: 'Updating sticky wall...' });
    
        return this.apiService.put<IStickyWall>(`sticky-wall/${id}`, newWall).pipe(
          map((res) => {
            if (res.data) {
               const updatedStickyWall = res.data;
              const currentStickyWalls = this.stickyWallSubject.value;
              
               const index = currentStickyWalls.findIndex(wall => wall._id === id);
              
              if (index !== -1) {
                
                currentStickyWalls[index] = updatedStickyWall;
                
                this.stickyWallSubject.next([...currentStickyWalls]);
              }
            }
            this.loadingService.setState({ loading: false, message: '' });
            return res;  
          }),
          catchError((error) => {
            console.error('Error updating sticky wall:', error);
            this.loadingService.setState({ loading: false, message: 'Failed to update sticky wall.' });
            return of(null);  
          })
        );
      }
    
      deleteStickyWall(id: string): Observable<IAPIResposne<null> | null> {
        this.loadingService.setState({ loading: true, message: 'Deleting sticky wall...' });
    
        return this.apiService.delete<null>(`sticky-wall/${id}`).pipe(
            map((res) => {
                // Check if the API response indicates a successful deletion
                if (res && res.data === null) {
                    // Get the current list of sticky walls from the BehaviorSubject
                    let currentStickyWalls = this.stickyWallSubject.value;
    
                    // Filter out the sticky wall that matches the id
                    currentStickyWalls = currentStickyWalls.filter((wall) => wall._id !== id);
    
                    // Emit the updated list into the BehaviorSubject
                    this.stickyWallSubject.next([...currentStickyWalls]);
                } else {
                    console.error('Failed to delete sticky wall: Response data is not null.');
                }
    
                // Stop loading state
                this.loadingService.setState({ loading: false, message: '' });
    
                // Return the response, which will be handled by the component
                return res;
            }),
            catchError((error) => {
                console.error('Error deleting sticky wall:', error);
    
                // Stop loading state and show error message
                this.loadingService.setState({ loading: false, message: 'Failed to delete sticky wall.' });
    
                // Return a fallback value in case of an error
                return of(null);
            })
        );
    }
    
    
}