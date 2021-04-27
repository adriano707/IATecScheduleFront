import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private http:HttpClient) { }

  ngOnInit(): void {
    
  }

  logon(){
    this.loginService.login(this.user, this.password);
  }

}
