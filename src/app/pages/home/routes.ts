import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { UpcomingComponent } from "../upcoming/upcoming.component";
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { StickyWallComponent } from "../sticky-wall/sticky-wall.component";
import { HistoryComponent } from "../../components/history/history.component";
import { NotfoundComponent } from "../../shared/notfound/notfound.component";
import { CreateStickyWallComponent } from "../../components/create-sticky-wall/create-sticky-wall.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { TaskComponent } from "../../components/task/task.component";
import { OverdueComponent } from "../overdue/overdue.component";
import { TodayComponent } from "../today/today.component";
export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'up-coming', component: UpcomingComponent, children: [
          {
            path: 'task/:id',
            component: TaskComponent,
            resolve: {
              // taskData: TaskResolver
            }
          },
          {
            path: 'task',  // Route without ID
            component: TaskComponent
          }
        ]
      },
      {
        path: 'today', component: TodayComponent, children: [
          {
            path: 'task/:id',
            component: TaskComponent,
            resolve: {
              // taskData: TaskResolver
            }
          },
          {
            path: 'task',  // Route without ID
            component: TaskComponent
          }
        ]
      },
      { path: '', redirectTo: 'today', pathMatch: 'full' }, // Default route
      { path: 'calendar', component: CalendarComponent },
      {
        path: 'sticky-wall',
        component: StickyWallComponent,

        children: [
          {
            path: 'note/:id',
            component: CreateStickyWallComponent,
            resolve: {

            }
          },
          {
            path: 'note',
            component: CreateStickyWallComponent
          }


        ]
      },
      { path: 'history', component: HistoryComponent },
      { path: 'overdue', component: OverdueComponent },

      { path: '**', component: NotfoundComponent }
    ]
  }
];
