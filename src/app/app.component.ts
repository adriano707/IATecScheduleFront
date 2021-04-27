import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'IATecSchedule';

  user = {} as User;
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.GetUser();
  }

}
