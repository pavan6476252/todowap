import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3, heroMagnifyingGlass, heroChevronDoubleRight, heroClock, heroQueueList, heroCalendarDays, heroBookOpen, heroPlus, heroCog6Tooth, heroArrowLeftEndOnRectangle, heroBackward, heroExclamationTriangle } from '@ng-icons/heroicons/outline'
import { ListService } from '../../core/services/list.service';
import { Observable } from 'rxjs';
import { ITag } from '../../core/interfaces/tag.interface';
import { AuthService } from '../../core/services/auth.service';
import { ProfileTileComponent } from '../../components/profile-tile/profile-tile.component';
import { ITask } from '../../core/interfaces/task.interface';
import { TaskService } from '../../core/services/task.service';
import { ListsComponent } from "../../components/lists/lists.component";
import { TagService } from '../../core/services/tag.service';
import { TagsComponent } from "../../components/tags/tags.component";

@Component({
  selector: 'app-menu',
  imports: [
    NgIcon,
    NgFor,
    NgClass,
    RouterModule,
    CommonModule,
    ProfileTileComponent,
    ListsComponent,
    TagsComponent
  ],
  viewProviders: [
    provideIcons({ heroBars3, heroExclamationTriangle, heroMagnifyingGlass, heroChevronDoubleRight, heroClock, heroQueueList, heroCalendarDays, heroBookOpen, heroPlus, heroCog6Tooth, heroArrowLeftEndOnRectangle, heroBackward })],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  tags$: Observable<ITag[]> = new Observable();
  stasks$: Observable<ITask[]> = new Observable();

  navigationRoutes: { link: string, name: string, icon: string, notification?: number }[] = [
    { link: 'up-coming', name: 'UpComing', icon: 'heroChevronDoubleRight' },
    { link: 'today', name: 'Today', icon: 'heroQueueList' },
    { link: 'overdue', name: 'Overdue', icon: 'heroExclamationTriangle' },
    { link: 'calendar', name: 'Calendar', icon: 'heroCalendarDays' },
    { link: 'history', name: 'History', icon: 'heroClock' },
    { link: 'sticky-wall', name: 'Sticky Wall', icon: "heroBookOpen" },
  ]

  constructor(private router: Router, private listService: ListService, private tagService: TagService, private authService: AuthService, private taskService: TaskService) {
    // taskService.getCurrentDayTasks().subscribe((val)=>{
    //   this.navigationRoutes[1].notification=val.length;
    // })
  }

  ngOnInit(): void {
    this.tags$ = this.tagService.getTags()
  }

  isRouteActive(route: string): boolean {
    const currentRoute = this.router.url;
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`
    // console.log(currentRoute,normalizedRoute )

    if (normalizedRoute === '/' || normalizedRoute === '/today') {
      return currentRoute === '/' || currentRoute === '/today';
    }

    return currentRoute === normalizedRoute;
  }
  logOut() {
    this.authService.logout().subscribe((val) => {
      console.log(val);
      this.router.navigate(['/auth'])
    })
  }
}
