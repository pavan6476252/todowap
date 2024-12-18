import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { authRoutes } from './pages/auth/auth.routes';
import { homeRoutes } from './pages/home/routes';
import { NotfoundComponent } from './shared/notfound/notfound.component';

export const routes: Routes = [
    ...authRoutes,
    ...homeRoutes,
    { path: '**', component: NotfoundComponent }
];
