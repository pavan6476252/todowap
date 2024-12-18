import { Component, OnDestroy, OnInit } from '@angular/core';
import { StickyWallService } from '../../core/services/sticky-wall.service';
import { filter, Observable, Subscription } from 'rxjs';
import { IStickyWall } from '../../core/interfaces/sticky-wall.interface';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sticky-wall',
  imports: [
    RouterModule,
    CommonModule,
    NgIcon
  ],
  viewProviders: [
    provideIcons({ heroPlus })],

  templateUrl: './sticky-wall.component.html',
})
export class StickyWallComponent implements OnInit, OnDestroy {
  stickyWalls$: Observable<IStickyWall[]> = new Observable();
  isSubRouteActive: boolean = false;
  routerSubscription!: Subscription;
  constructor(private stickyWallService: StickyWallService, private router: Router) { }

  ngOnInit(): void {
    this.stickyWalls$ = this.stickyWallService.getStickyWalls();

    this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkIfSubRouteIsActive();
    })

    this.checkIfSubRouteIsActive();
  }
  
  private checkIfSubRouteIsActive(): void {
    const currURL = this.router.url;
    this.isSubRouteActive = currURL.startsWith('/sticky-wall/create')
    console.log(this.isSubRouteActive)
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

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
