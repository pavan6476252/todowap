import { Component, EventEmitter, OnInit } from '@angular/core';
import { StickyWallService } from '../../core/services/sticky-wall.service';
import { Observable } from 'rxjs';
import { IStickyWall } from '../../core/interfaces/sticky-wall.interface';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroXMark } from '@ng-icons/heroicons/outline';
import { Router, RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-sticky-wall',
  imports: [
    CommonModule,
    RouterModule,
    NgIcon, 
  ],
  viewProviders: [
    provideIcons({ heroPlus, heroXMark })],

  templateUrl: './create-sticky-wall.component.html',
})
export class CreateStickyWallComponent implements OnInit {
  stickyWalls$: Observable<IStickyWall[]> = new Observable();

  // editor 
  description: string = 'sfd'


  constructor(private stickyWallService: StickyWallService, private router: Router) { }

  ngOnInit(): void {
    // Subscribing to the observable to get sticky walls data
    this.stickyWalls$ = this.stickyWallService.getStickyWalls();
  }
  closeStickyPanel(): void {
    const currentUrl = this.router.url;
    const parentUrl = currentUrl.split('/').slice(0, -1).join('/');
    this.router.navigateByUrl(parentUrl || '/');
  }
  handleDescriptionChange(updatedContent: string | null): void {
    console.log('Updated Description: ', updatedContent);
    this.description = updatedContent ?? "";
  }

  getStickyWalls() {
    return this.stickyWalls$;
  }
  addStickyWall(): void {
    const newWall: IStickyWall = {
      title: 'New Task',
      desc: 'Description for the new task',
      created_date: new Date(),
      completed: false,
    };
    this.stickyWallService.addStickyWall(newWall);
  }

  
}
