import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroXMark } from '@ng-icons/heroicons/outline';
import { Observable } from 'rxjs';
import { IList } from '../../core/interfaces/list.interface';
import { ListService } from '../../core/services/list.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs'; 
import { ITag } from '../../core/interfaces/tag.interface'; 
import { TagService } from '../../core/services/tag.service';

@Component({
  selector: 'app-tags',
  imports: [NgIcon, CommonModule,ReactiveFormsModule],
  providers: [provideIcons({ heroPlus,heroXMark })],
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  isAddTagsOptionEnable = false;
  newTagForm: FormGroup;
  tags$: Observable<ITag[]> = new Observable();
  loading = false; 
  errorMessage: string | null = null;  

  constructor(
    private router: Router,
    private tagService: TagService,
    private formBuilder: FormBuilder
  ) {
    this.newTagForm = this.formBuilder.group({
      id: [''],
      label: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchLists();
    this.tags$ = this.tagService.getTags()
  }

  fetchLists() {
    this.loading = true;
     this.tagService.fetchTags().pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to load lists. Please try again later.';
        this.loading = false;
        return of([]);
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }

  toggleAddTagList() {
    this.isAddTagsOptionEnable = !this.isAddTagsOptionEnable;
  }

  isFormDirty(): boolean {
    return this.newTagForm?.dirty && this.newTagForm?.valid;
  }

  addTag() {
    if (this.newTagForm?.valid) {
      const newTag: ITag = {
        _id: this.newTagForm.value.id,
        label: this.newTagForm.value.label,
        color: this.newTagForm.value.color,
      
      };

      this.loading = true;

      if( this.newTagForm.value.id==''){
      this.tagService.addTag(newTag).pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to add list. Please try again later.';
          this.loading = false;
          return of(null);
        })
     
      ).subscribe(() => {
        this.newTagForm.reset({
          id:"",
          label:"",
          color:"#ffffff"
        });
        this.toggleAddTagList();
        this.fetchLists();
      });
      
    }else{
      this.tagService.updateTag(newTag).pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to add list. Please try again later.';
          this.loading = false;
          return of(null);
        })
     
      ).subscribe(() => {
        this.newTagForm.reset({
          id:"",
          label:"",
          color:"#ffffff"
        });
        this.toggleAddTagList();
        this.fetchLists();
      });
        
    }
     
    }
  }

  deleteTagItem(id: string) {
    this.loading = true;
    this.tagService.deleteTag(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Failed to delete list. Please try again later.';
        this.loading = false;
        return of(null);
      })
    ).subscribe(() => {
      this.fetchLists();
    });
  }

  editTagItem(list: IList) {
    this.newTagForm.setValue({
      id:list._id,
      label: list.label,
      color: list.color,
    });
    this.toggleAddTagList();
  }
}
