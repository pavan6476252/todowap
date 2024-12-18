import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { IntroComponent } from "./intro/intro.component";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";


export const authRoutes: Routes = [
    {
        path: 'auth', component: AuthComponent,
        children: [
            { path: '', component: IntroComponent },
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]
    }
]