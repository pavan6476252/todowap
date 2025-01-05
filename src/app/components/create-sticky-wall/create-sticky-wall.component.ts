import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StickyWallService } from '../../core/services/sticky-wall.service';
import { IStickyWall } from '../../core/interfaces/sticky-wall.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  imports:[NgIcon,ReactiveFormsModule,CommonModule],
  providers:[
    provideIcons({heroXMark})
  ],
  selector: 'app-create-sticky-wall',
  templateUrl: './create-sticky-wall.component.html',
})
export class CreateStickyWallComponent implements OnInit {
  stickyNoteForm: FormGroup;
  stickyWallId: string|null =null;

  constructor(
    private formBuilder: FormBuilder,
    private stickyWallService: StickyWallService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { 
    this.stickyNoteForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      desc: ['', [Validators.required, Validators.minLength(4)]],
      color: ['#335555', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.fetchStickyWallData(id);
    }
  }
 
  fetchStickyWallData(id: string): void {
    this.stickyWallService.fetchStickyWall(id).subscribe(
      (response) => {
        if(response?.data){
          const stickyWall = response?.data
          this.stickyWallId = stickyWall._id!;
          this.stickyNoteForm.patchValue({
            title: stickyWall.title,
            desc: stickyWall.desc,
            color: stickyWall.color || '#335555', 
          });
        }
        return response?.data;
      },
      (error) => {
        console.error('Error fetching sticky wall:', error);
      }
    );
  }
 
  onStickyNoteFormSubmit(): void {
    if (this.stickyNoteForm.invalid) {
      return;
    }

    const { title, desc, color } = this.stickyNoteForm.value;

    const newWall: IStickyWall = {
      title,
      desc,
      color,
      created_date: new Date(),
      completed: false,
    }; 
    if (this.stickyWallId) { 
      this.stickyWallService.updateStickyWall(this.stickyWallId, newWall).subscribe(() => {
        this.router.navigate(['/sticky-wall']); 
      });
    } else { 
      this.stickyWallService.addStickyWall(newWall).subscribe(() => {
        this.stickyNoteForm.reset({
          color: '#335555',  
        });
        this.router.navigate(['/sticky-wall']);  
      });
    }
  }

  onDeleteStickyWall():void{
    if(this.stickyWallId)
    this.stickyWallService.deleteStickyWall(this.stickyWallId  ).subscribe(() => {
      this.router.navigate(['/sticky-wall']); 
    });
  }
 
  isFormDirty(): boolean {
    return this.stickyNoteForm.dirty && this.stickyNoteForm.valid;
  }
 
  navigateToParent(): void {
    this.router.navigate(['/sticky-wall'], { relativeTo: this.activeRouter });
  }
}
