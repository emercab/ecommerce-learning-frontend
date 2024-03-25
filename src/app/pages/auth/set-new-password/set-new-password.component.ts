import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../../../helpers/helper.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-new-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.css'
})
export class SetNewPasswordComponent {

  public newPassword: string = '';

  @Input() public code: string = '';

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _helper: HelperService = inject(HelperService);


  constructor() {}


  public setNewPassword(): void {
    // Valido que el campo no este vacio
    if (this.newPassword === '') {
      this._helper.toaster('Please enter the new password.', 'Error', 'error');
      return;
    }

    this._authService.setNewPassword(this.code, this.newPassword)
      .subscribe({
        next: (resp: any) => {
          if (resp.error && resp.error.code === 1) {
            this._helper.toaster(resp.error.message, 'Error', 'error');
            return;
          }

          if (resp.set) {
            this._helper.toaster(resp.message, 'Password updated', 'success');
            this._router.navigate(['/login']);
            return;
          }
        },
        error: (err: any) => {
          console.log(err);
          this._helper.toaster('An error occurred, please try again later.', 'Error', 'error');
        }
      });
  }

}
