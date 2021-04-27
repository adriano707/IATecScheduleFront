import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
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
        /*const routeToReturn = this.route.snapshot.queryParams.returnUrl || '/';
        this.router.navigate([routeToReturn]);*/
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
