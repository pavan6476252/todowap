import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { UpcomingComponent } from "../../components/upcoming/upcoming.component";
import { TodayComponent } from "../../components/today/today.component";
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { StickyWallComponent } from "../../components/sticky-wall/sticky-wall.component";
import { HistoryComponent } from "../../components/history/history.component";
import { NotfoundComponent } from "../../shared/notfound/notfound.component";
import { CreateStickyWallComponent } from "../../components/create-sticky-wall/create-sticky-wall.component";
export const homeRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      children: [
        { path: 'up-coming', component: UpcomingComponent },
        { path: 'today', component: TodayComponent },
        { path: '', redirectTo: 'today', pathMatch: 'full' }, // Default route
        { path: 'calendar', component: CalendarComponent },
        {
          path: 'sticky-wall',
          component: StickyWallComponent,
          children: [
            { path: 'create', component: CreateStickyWallComponent }
          ]
        },
        { path: 'history', component: HistoryComponent },
        { path: '**', component: NotfoundComponent }
      ]
    }
  ];
  