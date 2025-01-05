import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../core/interfaces/task.interface';
import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  imports: [NgIcon, CommonModule, RouterModule]
})
export class TaskItemComponent {
  @Input() task!: ITask;
  @Output() toggleStatus = new EventEmitter<ITask>();

  toogleTaskStatus() {
    this.toggleStatus.emit(this.task);
  }
}
