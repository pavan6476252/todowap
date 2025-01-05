import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-add-task-button',
  templateUrl: './add-task-button.component.html',
  imports: [NgIcon],
  providers: [provideIcons({ heroPlus })]
})
export class AddTaskButtonComponent { }
