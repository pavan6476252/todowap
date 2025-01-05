import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-header',
  imports: [],
  templateUrl: './task-header.component.html',
})
export class TaskHeaderComponent {
  @Input() title: string = 'Today';
  @Input() taskCount: number = 0;
}
