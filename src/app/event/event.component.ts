import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/services/notification.service';
import { SpinnerService } from 'src/app/Shared/services/spinner.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  data = this.fb.group({
    name: null,
    type: null,
    EventDate: null,
    local: null,
    participants: null,
    status: null,
  });

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  save(): void {

    const infoUser = localStorage.getItem('user');
    const user = JSON.parse(infoUser);

    const headers = new HttpHeaders({
      'Authorization': `bearer ${user.token}`
    });

    const options = {headers};

    this.httpClient
      .post<any>(`https://localhost:44317/events`, this.data.value, options)
      .subscribe(
        (res) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Successfully included.',
            ''
          );
        },
        (error) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Error when registering.',
            ''
          );
        }
      );
  }
}
