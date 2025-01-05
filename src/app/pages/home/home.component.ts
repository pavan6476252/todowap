import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, LoadingComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  constructor(private userService :UserService){

  }
  ngOnInit(): void {
    this.userService.getProfileInfo();
  }
}
