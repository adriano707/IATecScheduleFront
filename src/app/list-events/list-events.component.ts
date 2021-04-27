import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../Shared/services/notification.service';
import { SpinnerService } from '../Shared/services/spinner.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

  events: any[];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.GetEvents();
  }

  GetEvents(): void {

    const infoUser = localStorage.getItem('user');
    const user = JSON.parse(infoUser);

    const headers = new HttpHeaders({
      'Authorization': `bearer ${user.token}`
    });

    const options = {headers};

    this.httpClient
      .get<any[]>(`https://localhost:44317/events`, options)
      .subscribe(
        (res) => {
          this.spinnerService.spin$.next(false);
          this.events = res;
        },
        (error) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Error on get events.',
            ''
          );
        }
      );
  }

}
