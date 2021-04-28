import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/Shared/services/notification.service';
import { SpinnerService } from 'src/app/Shared/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  login() {
    this.http
      .post<any>(`https://localhost:44317/users/login`, {
        login: this.user,
        password: this.password,
      })
      .subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));

        this.spinnerService.spin$.next(false);
        this.notificationService.showNotification(
          'successfully logged in.',
          ''
        );

      });
  }
}
