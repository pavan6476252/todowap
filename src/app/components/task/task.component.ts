import { Component, NgModule, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { StickyWallService } from '../../core/services/sticky-wall.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ListService } from '../../core/services/list.service';
import { IList } from '../../core/interfaces/list.interface';
import { TagService } from '../../core/services/tag.service';
import { ITag } from '../../core/interfaces/tag.interface';
import { ICreateTask, ISubTask, ITask } from '../../core/interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { NgIcon, NgIconsModule, provideIcons } from '@ng-icons/core';
import { heroPlus, heroXMark } from '@ng-icons/heroicons/outline';
import { FormBuilder, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    RouterModule,
    NgIcon,
    ReactiveFormsModule,

  ],
  providers: [provideIcons({ heroPlus, heroXMark })],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  lists$: Observable<IList[]> = new Observable();
  tags$: Observable<ITag[]> = new Observable();

  loading = false;
  errorMessage: string | null = null;

  subTasks: ISubTask[] = [
    // { completed: false, _id: '1', created_date: new Date(), title: "dfsf" },
    // { completed: false, _id: '2', created_date: new Date(), title: "dfsf" },
    // { completed: false, _id: '3', created_date: new Date(), title: "dfsf" },
    // {completed:false,_id:'4',created_date:new Date(),title:"dfsf"},
    // {completed:false,_id:'5',created_date:new Date(),title:"dfsf"},
    // {completed:false,_id:'6',created_date:new Date(),title:"dfsf"},
    // {completed:false,_id:'7',created_date:new Date(),title:"dfsf"}
  ];

  private isSubTaskChanged = false

  tags: ITag[] = [];
  private isTagsChanged = false;

  subTaskForm?: FormGroup;
  taskForm?: FormGroup;

  constructor(
    private router: Router,
    private listService: ListService,
    private tagService: TagService,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private activeRouter: ActivatedRoute
  ) {



    this.taskForm = this.formBuilder.group({
      id: [''],
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      desc: ['', Validators.required],
      list: ['', Validators.required],
      expiry_date: [this.formatDate(new Date())]
    })

    this.subTaskForm = new FormGroup({
      completed: new FormControl(''),
      title: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.lists$ = this.listService.getList();
    this.tags$ = this.tagService.getTags();


    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.fetchTaskData(id);
    }
  }
  private fetchTaskData(id: string) {
    this.taskService.getTaskById(id).subscribe(
      (response) => {
        if (response && response?.data) {
          const task = response?.data
          this.subTasks = task.sub_tasks;
          this.taskForm?.patchValue({
            id: task._id,
            title: task.title,
            desc: task.desc,
            list: task.list._id,
            expiry_date: task.expiry_date.toString().split('T')[0]
          });
        }
        return response?.data;
      },
      (error) => {
        console.error('Error fetching sticky wall:', error);
      }
    );
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  addTag(event$: Event) {
    const selectElement = event$.target as HTMLSelectElement;
    const selectedTagLabel = selectElement.value;

    this.tagService.tags$.pipe(
      map((tags) => {
        const selectedTagIdx = tags.findIndex((tag) => tag._id === selectedTagLabel);

        if (selectedTagIdx != -1 && !tags.includes(this.tags[selectedTagIdx])) {
          this.tags.push(tags[selectedTagIdx]);
          // console.log(this.tags);
          this.isTagsChanged = true
        }
      })
    ).subscribe({});
  }



  removeTag(idx: number) {
    this.isTagsChanged = true;
    this.tags = this.tags.filter((_, index) => index !== idx);
  }



  addSubTask() {
    const { title } = this.subTaskForm?.value;
    if (title) {
      this.isSubTaskChanged = true
      this.subTasks.push({
        title: title,
        completed: false,
        _id: `${this.subTasks.length}`,
        created_date: new Date(),
        completed_date: undefined
      });
    }
  }

  removeSubTask(id: string) {
    this.isSubTaskChanged = true
    this.subTasks = this.subTasks.filter(task => task._id !== id);
  }

  toggleSubTaskStatus(id: string) {
    const idx = this.subTasks.findIndex(task => task._id === id);
    if (idx !== -1) {
      this.isSubTaskChanged = true;
      this.subTasks[idx].completed = !this.subTasks[idx].completed;
      this.subTasks[idx].completed_date = this.subTasks[idx].completed ? new Date() : undefined;
    }
  }

  isFormDirty(): boolean {
    // console.log(this.taskForm)
    //  console.log(!(this.taskForm?.dirty &&!this.taskForm?.invalid)||this.isTagsChanged , this.isSubTaskChanged , this.isTagsChanged )

    return ((this.taskForm?.dirty && !this.taskForm?.invalid) || this.isTagsChanged || this.isSubTaskChanged || this.isTagsChanged)
  }

  onTaskFormSubmit() {
    // console.log(this.taskForm?.value)
    if (this.isFormDirty()) {
      const { id, title, desc, list, expiry_date } = this.taskForm?.value;

      if (id !== '') {
        const editedTask: Partial<ICreateTask> = {
          _id: id,
          title: title,
          desc,
          list: list,
          expiry_date: new Date(expiry_date),
          sub_tasks: this.subTasks.map(subTask => {
            const { _id, ...subTaskWithoutId } = subTask;
            return subTaskWithoutId;
          }),
          tags: this.tags.map((tag) => tag._id),
        }

        this.patchTaskDetails(editedTask)

      } else {
        const newTask: ICreateTask = {
          title: title,
          desc,
          list: list,
          completed: false,
          created_date: new Date(),
          expiry_date: new Date(expiry_date),
          sub_tasks: this.subTasks.map(subTask => {
            const { _id, ...subTaskWithoutId } = subTask;
            return subTaskWithoutId;
          }),
          tags: this.tags.map((tag) => tag._id),
        }
        this.createNewTask(newTask)
      }
    }
  }


  private createNewTask(newTask: ICreateTask) {
    this.loading = true;
    this.taskService.addTask(newTask).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to add task. Please try again later.';
        this.loading = false;
        return of(null);
      })

    ).subscribe(() => {
      this.resetForm()
      // this.fetchTasks();
    });
  }
  private patchTaskDetails(editedTask: Partial<ICreateTask>) {
    console.log("  edited task", editedTask)
    this.loading = true;

    this.taskService.patchTaks(editedTask).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to edit task. Please try again later.';
        this.loading = false;
        return of(null);
      })

    ).subscribe(() => {
      this.resetForm()
      // this.fetchTasks();
    });
  }
  private resetForm() {
    this.taskForm?.reset({
      id: '',
      title: '',
      desc: '',
      list: '',
      expiry_date: [this.formatDate(new Date())]
    })
  }


  navigateToParent(): void {
    this.router.navigate(['/sticky-wall'], { relativeTo: this.activeRouter });
  }
}
