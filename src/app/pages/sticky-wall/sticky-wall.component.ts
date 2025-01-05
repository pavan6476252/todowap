import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StickyWallService } from '../../core/services/sticky-wall.service';
import { filter, Observable, Subscription } from 'rxjs';
import { IStickyWall } from '../../core/interfaces/sticky-wall.interface';
import { CommonModule, NgStyle } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sticky-wall',
  imports: [
    RouterModule,
    CommonModule,
    NgIcon,
    NgStyle
  ],
  viewProviders: [
    provideIcons({ heroPlus })], 

  templateUrl: './sticky-wall.component.html',
})
export class StickyWallComponent implements OnInit, OnDestroy { 

  stickyWalls$: Observable<IStickyWall[]> = new Observable();
  isSubRouteActive: boolean = false;
  routerSubscription!: Subscription;
  constructor(private stickyWallService: StickyWallService, private router: Router,private activatedRoute:ActivatedRoute) { }
   

  ngOnInit(): void {
    this.stickyWalls$ = this.stickyWallService.getStickyWalls();
    this.stickyWallService.fetchStickyWalls() .subscribe()
  
    
    this.routerSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkIfSubRouteIsActive();
    })

    this.checkIfSubRouteIsActive();
  }
  
  private checkIfSubRouteIsActive( ): void {
    const currURL = this.router.url;
    this.isSubRouteActive = currURL.includes('/note')
    console.log(currURL,this.isSubRouteActive)
    }
  

  getStickyWalls() {
    return this.stickyWalls$;
  }

  addStickyWall(): void {
    const newWall: IStickyWall = {
      title: 'New Task',
      desc: 'Description for the new task',
      created_date: new Date(),
      color:'#432344',
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
