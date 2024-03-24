import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HelperService } from '../../../helpers/helper.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public uniqueCode: string = '';

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _helper: HelperService = inject(HelperService);

  constructor() { }


  ngOnInit(): void {
    // Reviso si ya el usuario se ha logueado para redirigirlo al home
    if (this._authService.token && this._authService.user) {
      this._router.navigate(['/']);
    }

    // Obtengo el parametro de la url y lo asigno a la variable uniqueCode
    this._activatedRoute.queryParams
      .subscribe((resp: any) => {
        this.uniqueCode = resp.code;
        console.log('uniqueCode', this.uniqueCode);
      });
    
    // Si existe el parametro uniqueCode, verifico el email del usuario
    if (this.uniqueCode) {
      this._authService.verifyEmail(this.uniqueCode)
        .subscribe({
          next: (resp: any) => {
            if (resp.error && resp.error.code === 1) {
              this._helper.toaster(resp.error.message, 'Error', 'error');
              return;
            }

            if (resp.verified) {
              this._helper.toaster(resp.message, 'Email verified', 'success');
              this._router.navigate(['/login']);
            }
          },
          error: () => {
            this._helper.toaster('Error trying to verify email. Please try later.', 'Error', 'error');
          },
        });
    }
       

  }


  public login() {
    if (!this.email || !this.password) {
      this._helper.toaster('Please enter email and password.', 'Error', 'error');
      return;
    }

    this._authService.login(this.email, this.password)
      .subscribe({
        next: (resp: any) => {
          if (resp.error && resp.error.code === 1) {
            this._helper.toaster(resp.error.message, 'Error', 'error');
            return;
          }

          if (resp.error && resp.error.code === 2) {
            this._helper.toaster(resp.error.message, 'Error', 'error');
            return;
          }

          if (resp) {
            this._helper.toaster('Login successful.', 'Welcome', 'success');
            this._router.navigate(['/']);
          }
        },
        error: (err: any) => {
          this._helper.toaster('Error trying to login. Please try later.', 'Error', 'error');
        },
      });
  }


  public showSuccess() {
    //this._toastr.success('Hello world!', 'Toastr fun!');
  }
}
