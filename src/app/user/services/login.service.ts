import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  login(username, password) {
    const headers = new HttpHeaders({
      'X-App-Version': '0.4'
    });
    const options = {headers};
    return this.http.post<any>(environment.authUrl, {username, password}, options).subscribe(user => {
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

}
