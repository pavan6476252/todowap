import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroXMark } from '@ng-icons/heroicons/outline';
import { Observable } from 'rxjs';
import { IList } from '../../core/interfaces/list.interface';
import { ListService } from '../../core/services/list.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs'; // For error handling

@Component({
  selector: 'app-lists',
  imports: [NgIcon, CommonModule,ReactiveFormsModule],
  providers: [provideIcons({ heroPlus,heroXMark })],
  templateUrl: './lists.component.html',
})
export class ListsComponent implements OnInit {
  isAddlistOptionEnable = false;
  newListForm: FormGroup;
  lists$: Observable<IList[]> = new Observable();
  loading = false; 
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private listService: ListService,
    private formBuilder: FormBuilder
  ) {
    this.newListForm = this.formBuilder.group({
      id: [''],
      label: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchLists();
    this.lists$ = this.listService.getList()
  }

  fetchLists() {
    this.loading = true;
     this.listService.fetchLists().pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to load lists. Please try again later.';
        this.loading = false;
        return of([]);
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }

  toggleAddNewList() {
    this.isAddlistOptionEnable = !this.isAddlistOptionEnable;
  }

  isFormDirty(): boolean {
    return this.newListForm?.dirty && this.newListForm?.valid;
  }

  addList() {
    if (this.newListForm?.valid) {
      const newList: IList = {
        _id: this.newListForm.value.id,
        label: this.newListForm.value.label,
        color: this.newListForm.value.color,
      
      };

      this.loading = true;

      if( this.newListForm.value.id==''){
      this.listService.addList(newList).pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to add list. Please try again later.';
          this.loading = false;
          return of(null);
        })
     
      ).subscribe(() => {
        this.newListForm.reset({
          id:"",
          label:"",
          color:"#ffffff"
        });
        this.toggleAddNewList();
        // this.fetchLists();
      });
      
    }else{
      this.listService.updateList(newList).pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to add list. Please try again later.';
          this.loading = false;
          return of(null);
        })
     
      ).subscribe(() => {
        this.newListForm.reset({
          id:"",
          label:"",
          color:"#ffffff"
        });
        this.toggleAddNewList();
        // this.fetchLists();
      });
        
    }
     
    }
  }

  deleteListItem(id: string) {
    this.loading = true;
    this.listService.deleteList(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to delete list. Please try again later.';
        this.loading = false;
        return of(null);
      })
    ).subscribe(() => {
      // this.fetchLists();
    });
  }

  editListItem(list: IList) {
    this.newListForm.setValue({
      id:list._id,
      label: list.label,
      color: list.color,
    });
    this.toggleAddNewList();
  }
}
