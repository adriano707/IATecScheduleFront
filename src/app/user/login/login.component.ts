import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = '';
  password: string = '';

  constructor(private loginService: LoginService, 
     private http:HttpClient,
     private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  login(username, password) {
    
    return this.http.post<any>(environment.authUrl, {username, password}).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      const routeToReturn = this.route.snapshot.queryParams.returnUrl || '/';
      this.router.navigate([routeToReturn]);
      return user;
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  logon(){
    this.loginService.login(this.user, this.password);
  }

}
