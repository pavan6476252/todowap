import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { filter, Observable, of, Subscription } from 'rxjs';
import { IUpComingDaysTasks } from '../../@types/tasks';
import { TaskHeaderComponent } from "../../components/task-header/task-header.component";
import { AddTaskButtonComponent } from "../../components/add-task-button/add-task-button.component";
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { CommonModule, NgIf } from '@angular/common';
import { ITask } from '../../core/interfaces/task.interface';

@Component({
  selector: 'app-upcoming',
  imports: [RouterModule, TaskHeaderComponent, NgIf, AddTaskButtonComponent, TaskListComponent, CommonModule],
  templateUrl: './upcoming.component.html',
})
export class UpcomingComponent {
  todayTasks$: Observable<ITask[]> = new Observable<ITask[]>();
  thisWeekTasks$: Observable<ITask[]> = new Observable<ITask[]>();
  tomorrowTasks$: Observable<ITask[]> = new Observable<ITask[]>();


  isSubRouteActive: boolean = false;
  routerSubscription!: Subscription;

  constructor(private taskService: TaskService, private router: Router) {
    this.taskService.getUpComingDaysTasks().subscribe()
    this.taskService.upcomingDays$.subscribe((data) => {
      this.todayTasks$ = of(data.todayTasks);
      this.tomorrowTasks$ = of(data.tomorrowTasks);
      this.thisWeekTasks$ = of(data.thisWeekTasks);


    })
  }



  ngOnInit(): void {

    this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkIfSubRouteIsActive();
    })

    this.checkIfSubRouteIsActive();
  }

  private checkIfSubRouteIsActive(): void {
    const currURL = this.router.url;
    this.isSubRouteActive = currURL.startsWith('/up-coming/task')

  }
  toogleTaskStatus(task: ITask) {
    this.taskService.toggleTaskCompletionStatus(task._id)
  }
}
