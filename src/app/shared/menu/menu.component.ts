import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3, heroMagnifyingGlass, heroChevronDoubleRight, heroClock, heroQueueList, heroCalendarDays, heroBookOpen, heroPlus, heroCog6Tooth, heroArrowLeftEndOnRectangle, heroBackward } from '@ng-icons/heroicons/outline'
import { ListService } from '../../core/services/list.service';
import { Observable } from 'rxjs';
import { IList } from '../../core/interfaces/list.interface';
import { TagService } from '../../core/services/tag.service';
import { ITag } from '../../core/interfaces/tag.interface';

@Component({
  selector: 'app-menu',
  imports: [
    NgIcon,
    NgFor,
    NgClass,
    RouterModule,
    CommonModule,
  ],
  viewProviders: [
    provideIcons({ heroBars3, heroMagnifyingGlass, heroChevronDoubleRight, heroClock, heroQueueList, heroCalendarDays, heroBookOpen, heroPlus, heroCog6Tooth, heroArrowLeftEndOnRectangle, heroBackward })],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  lists$: Observable<IList[]> = new Observable();
  tags$: Observable<ITag[]> = new Observable();

  navigationRoutes: { link: string, name: string, icon: string }[] = [
    { link: 'up-coming', name: 'UpComing', icon: 'heroChevronDoubleRight' },
    { link: 'today', name: 'Today', icon: 'heroQueueList' },
    { link: 'calendar', name: 'Calendar', icon: 'heroCalendarDays' },
    { link: 'history', name: 'History', icon: 'heroClock' },
    { link: 'sticky-wall', name: 'Sticky Wall', icon: "heroBookOpen" },
  ]

  constructor(private router: Router, private listService: ListService, private tagsService: TagService) {
  }

  ngOnInit(): void {
    this.lists$ = this.listService.getList();
    this.tags$ = this.tagsService.getTags()
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

}
