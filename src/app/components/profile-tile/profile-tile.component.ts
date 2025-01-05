import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../@types/user';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-tile',
  imports: [NgIf,CommonModule],
  templateUrl: './profile-tile.component.html', 
})
export class ProfileTileComponent {
  user :Observable<IUser | null> ;
  
  constructor(private userService:UserService){
   this.user= this.userService.getProfileInfo()
  }
}
