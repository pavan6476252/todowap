import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../core/interfaces/task.interface';
import { Observable } from 'rxjs/internal/Observable';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks$: Observable<ITask[]> = new Observable();
  @Output() toggleStatus = new EventEmitter<ITask>();

  toogleTaskStatus(task: ITask) {
    this.toggleStatus.emit(task);
  }
}
