import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/services/notification.service';
import { SpinnerService } from 'src/app/Shared/services/spinner.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  data = this.fb.group({
    id: null,
    name: null,
    email: null,
    login: null,
    password: null,
    BirthDate: null,
    sex: null
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  save(): void {
    this.http
      .post<any>(`https://localhost:44317/users`, this.data.value)
      .subscribe(
        (res) => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification(
            'Successfully included.',
            ''
          );
        },
        (error => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification('Error when registering.', '');
        })
      );
  }

  back(): void {
    this.router.navigate(['/users']);
  }
}
