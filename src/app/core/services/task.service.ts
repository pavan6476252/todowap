import { Injectable } from "@angular/core";
import { ICreateTask, ITask } from "../interfaces/task.interface";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { MOCK_TASKS } from "../mock-data/task.mock";
import { ListService } from "./list.service";
import { TagService } from "./tag.service";
import { ApiService } from "./api.service";
import { IAPIResposne } from "../../@types/api-response";
import { IUpComingDaysTasks } from "../../@types/tasks";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskSubject = new BehaviorSubject<ITask[]>([]);
  private upcomingDaysSubject = new BehaviorSubject<IUpComingDaysTasks>({ thisWeekTasks: [], todayTasks: [], tomorrowTasks: [] });
  private overdueTaskSubject = new BehaviorSubject<ITask[]>([]);

  tasks$: Observable<ITask[]> = this.taskSubject.asObservable();
  upcomingDays$: Observable<IUpComingDaysTasks> = this.upcomingDaysSubject.asObservable();
  overdueTask$: Observable<ITask[]> = this.overdueTaskSubject.asObservable();

  constructor(private listService: ListService, private tagService: TagService, private apiService: ApiService) {
    // this.getFromLocalStorage().then((tasks) => {
    //   if (tasks.length > 0) {
    //     this.taskSubject.next(tasks);  
    //   } else {
    //     this.saveToLocalStorage().then(() => {
    //       this.getFromLocalStorage().then((data) => {
    //         this.taskSubject.next(data); 
    //       });
    //     });
    //   }
    // });
  }

  getTasks(): Observable<ITask[]> {
    return this.tasks$;
  }

  fetchTasks(): Observable<IAPIResposne<ITask[]>> {
    return this.apiService.get<ITask[]>('tasks').pipe(tap((response) => {
      if (response && response.data.length) {
        this.taskSubject.next([...response.data])
      }
    }));
  }


  addTask(newTask: ICreateTask): Observable<IAPIResposne<ITask>> {
    return this.apiService.post<ITask>('tasks', newTask)
      .pipe(
        tap((addedTask) => {
          if (addedTask && addedTask.data) {
            const currentTasks = this.taskSubject.value;
            this.taskSubject.next([...currentTasks, addedTask.data])
          }
        })
      )
  }
  patchTaks(editedtask: Partial<ICreateTask>): Observable<IAPIResposne<ITask>> {
    return this.apiService.put<ITask>(`tasks/${editedtask._id}`, editedtask)
      .pipe(
        tap((resposne) => {
          if (resposne && resposne.data) {
            let currentTasks = this.taskSubject.value;
            currentTasks = currentTasks.filter((task) => task._id !== resposne.data._id)

            this.taskSubject.next([...currentTasks, resposne.data])
          }
        })
      )
  }

  getTodayTasks(): Observable<IAPIResposne<ITask[]>> {
    // const currentDate = new Date();
    // return this.tasks$.pipe(
    //   map((tasks) => {
    //  return tasks.filter((task)=>{
    //    return new Date(task.created_date).toLocaleDateString()==currentDate.toLocaleDateString()
    // })

    //   })
    // );
    return this.apiService.get<ITask[]>('tasks/today').pipe(tap((response) => {
      if (response && response.data.length) {
        this.taskSubject.next([...response.data])
      }
    }));
  }


  getTaskById(id: string): Observable<IAPIResposne<ITask> | null> {
    return this.apiService.get<ITask>(`tasks/${id}`).pipe(
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  };


  getOverDueTasks(): Observable<IAPIResposne<ITask[]>> {
    return this.apiService.get<ITask[]>('tasks/overdue').pipe(tap((response) => {
      if (response && response.data.length) {
        this.overdueTaskSubject.next([...response.data])
      }
    }));
  }

  getUpComingDaysTasks(): Observable<IAPIResposne<IUpComingDaysTasks>> {
    return this.apiService.get<IUpComingDaysTasks>('tasks/up-coming').pipe(tap((response) => {
      if (response && response.data) {
        this.upcomingDaysSubject.next(response.data)
      }
    }));
  }

  toggleTaskCompletionStatus(taskId: string) {
    const updateTaskCompletion = (taskId: string) => {
      const updatedTasks = this.taskSubject.value.map((task) => {
        if (task._id === taskId) {
          task.completed = !task.completed;
          task.completed_date = task.completed ? new Date() : undefined;
        }
        return task;
      });
      this.taskSubject.next(updatedTasks);
    };
    updateTaskCompletion(taskId);

    return this.apiService.patch<ITask>('tasks/toggle-comlpetion', {})
      .pipe(
        catchError((err) => {
          updateTaskCompletion(taskId)
          return throwError(() => err)
        }))
  }

  deleteTask(id: string): Observable<IAPIResposne<null>> {
    return this.apiService.delete<null>(`tasks/${id}`).pipe(
      tap((resposne) => {
        if (resposne) {
          const filteredList = this.taskSubject.value.filter((task) => task._id !== id)
          this.taskSubject.next([...filteredList]);
        }
      })
    );
  }
  // private async saveToLocalStorage(): Promise<void> {
  //   localStorage.setItem('tasks', JSON.stringify(((await this.getFromLocalStorage()).length==0 ? MOCK_TASKS : this.taskSubject.value))); // Save current tasks
  // }

  // private async getFromLocalStorage(): Promise<ITask[]> {
  //   const tasks = localStorage.getItem('tasks');
  //   return tasks ? JSON.parse(tasks) : [];  
  // }
}
