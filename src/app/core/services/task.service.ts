import { Injectable } from "@angular/core";
import { ITask } from "../interfaces/task.interface";
import { MOCK_TASKS } from "../mock-data/task.mock";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { ListService } from "./list.service";
import { TagService } from "./tag.service";


@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private tasks: ITask[] = MOCK_TASKS;

    private taskSubject = new BehaviorSubject<ITask[]>(this.tasks);

    tasks$: Observable<ITask[]> = this.taskSubject.asObservable()

    constructor(private listService: ListService, private tagsService: TagService) {
        // observing changes from both services
        combineLatest([this.listService.lists$, this.tagsService.tags$]).subscribe((value) => {
            console.log(value[0])
        })
    }

    getTasks(): Observable<ITask[]> {
        return this.tasks$;
    }

   async addTask(newTask: ITask): Promise<void> {
        this.tasks.push(newTask);
        this.taskSubject.next([...this.tasks]);
        await this.saveToLocalStorage()
    }

    private async saveToLocalStorage(): Promise<void> {
        await localStorage.setItem('tasks', await JSON.stringify(this.tasks))
    }
}