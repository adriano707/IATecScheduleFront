import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { NotificationService } from 'src/app/Shared/services/notification.service';
import { SpinnerService } from 'src/app/Shared/services/spinner.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  data = this.fb.group({
    id: null,
    name: null,
    email: null,
    login: null,
    password: null,
    BirthDate: null,
    sex: null,
    role: 'basic_user'
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    

  }

  salvar(): void {
    const id = this.data.value.id;
    this.spinnerService.spin$.next(true);
    if (id) {
      this.http
        .put<any>(`${environment.UserService}users/${id}`, this.data.value)
        .subscribe(res => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification('Atualizado com sucesso.', '');
        });
    } else {

      this.userService.cadastrarUsuario(this.data.value)
        .subscribe(res => {
          this.spinnerService.spin$.next(false);
          this.notificationService.showNotification('Incluido com sucesso.', '');
        },
          error => {
            this.spinnerService.spin$.next(false);
            this.notificationService.showNotification('Erro a cadastrar.', '');
          });
    }
  }

  voltar(): void {
    this.router.navigate(['/users']);
  }

}