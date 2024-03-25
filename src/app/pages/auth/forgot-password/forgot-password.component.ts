import { Component, OnInit, inject } from '@angular/core';
import { ForgottenPasswordCodeComponent } from '../forgotten-password-code/forgotten-password-code.component';
import { SetNewPasswordComponent } from '../set-new-password/set-new-password.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../../helpers/helper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ForgottenPasswordCodeComponent,
    SetNewPasswordComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  public email: string = '';
  public code: string = '';
  public newPassword: string = '';

  // Flags to show or hide the different components to set a new password
  public isLoadingMail: boolean = true;
  public isLoadingCode: boolean = false;

  private _authService: AuthService = inject(AuthService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _helper: HelperService = inject(HelperService);


  constructor() { }


  ngOnInit(): void {
    // Obtengo el parametro de la url y lo asigno a la variable uniqueCode
    this._activatedRoute.queryParams
      .subscribe((resp: any) => {
        this.email = resp.email;
        console.log('email', this.email);
      });
  }


  public sendCode(): void {
    this._authService.sendCodeToResetPassword(this.email)
      .subscribe({
        next: (resp: any) => {
          if (resp.error && resp.error.code === 1) {
            this._helper.toaster(resp.error.message, 'Error', 'error');
            this.isLoadingMail = false;
            return;
          }

          if (resp.sent) {
            this.isLoadingMail = true;
            this._helper.toaster(resp.message, 'Email sent', 'success');
          }
        },
        error: () => {
          this.isLoadingMail = false;
          this._helper.toaster('Error trying to send email. Please try later.', 'Error', 'error');
        },
      });
  }


  public getLoadingCode($event: any): void {
    this.isLoadingCode = $event;
  }


  public getCode($event: any): void {
    this.code = $event;
    console.log('code', this.code);
  }

}
