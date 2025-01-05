import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroCalendar, heroPlus } from '@ng-icons/heroicons/outline';
import { TaskService } from '../../core/services/task.service';
import { filter, Observable, Subscription } from 'rxjs';
import { ITask } from '../../core/interfaces/task.interface';
import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TaskHeaderComponent } from "../../components/task-header/task-header.component";
import { AddTaskButtonComponent } from "../../components/add-task-button/add-task-button.component";
import { TaskListComponent } from "../../components/task-list/task-list.component";

@Component({
  selector: 'app-today',
  imports: [
    NgIcon,
    CommonModule,
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    RouterModule,
    TaskHeaderComponent,
    AddTaskButtonComponent,
    TaskListComponent
  ],
  viewProviders: [
    provideIcons({ heroPlus, heroCalendar, heroArrowRight })

  ],
  templateUrl: './today.component.html',
})
export class TodayComponent {
  tasks$: Observable<ITask[]> = new Observable()


  isSubRouteActive: boolean = false;
  routerSubscription!: Subscription;

  constructor(private taskService: TaskService, private router: Router) {
    this.taskService.getTodayTasks().subscribe();
    this.tasks$ = taskService.getTasks()
  }


  ngOnInit(): void {

    this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkIfSubRouteIsActive();
    })

    this.checkIfSubRouteIsActive();
  }

  private checkIfSubRouteIsActive(): void {
    const currURL = this.router.url;
    this.isSubRouteActive = currURL.startsWith('/today/task')
    // console.log(this.isSubRouteActive)
  }

  getDueData() {
    console.log("data")
  }
  toogleTaskStatus(task: ITask) {
    this.taskService.toggleTaskCompletionStatus(task._id)
  }
}
