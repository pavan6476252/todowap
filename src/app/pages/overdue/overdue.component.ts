import { CommonModule, NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroCalendar, heroArrowRight } from '@ng-icons/heroicons/outline';
import { Observable, Subscription, filter } from 'rxjs';
import { AddTaskButtonComponent } from '../../components/add-task-button/add-task-button.component';
import { TaskHeaderComponent } from '../../components/task-header/task-header.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { ITask } from '../../core/interfaces/task.interface';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-overdue',
  imports: [
    NgIcon,
    CommonModule,
    NgIf, 
    RouterModule,
    TaskHeaderComponent,
    AddTaskButtonComponent,
    TaskListComponent
  ],
  viewProviders: [
    provideIcons({ heroPlus, heroCalendar, heroArrowRight })

  ],
  templateUrl: './overdue.component.html',
})
export class OverdueComponent {
  tasks$: Observable<ITask[]> = new Observable()


  isSubRouteActive: boolean = false;
  routerSubscription!: Subscription;

  constructor(private taskService: TaskService, private router: Router) {
    this.tasks$ = taskService.overdueTask$;
    this.taskService.getOverDueTasks().subscribe()
  }


  ngOnInit(): void {

    this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkIfSubRouteIsActive();
    })

    this.checkIfSubRouteIsActive();
  }

  private checkIfSubRouteIsActive(): void {
    const currURL = this.router.url;
    this.isSubRouteActive = currURL.startsWith('/overdue/task')
    // console.log(this.isSubRouteActive)
  }

  getDueData() {
    console.log("data")
  }
  toogleTaskStatus(task: ITask) {
    this.taskService.toggleTaskCompletionStatus(task._id)
  }
}
