import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../helpers/helper.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password-code',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgotten-password-code.component.html',
  styleUrl: './forgotten-password-code.component.css'
})
export class ForgottenPasswordCodeComponent {

  public code: string = '';

  // Flag to send the code to the parent component
  public isLoadingCode: boolean = false;

  // Event to send the code to the parent component
  @Output() public onSendLoadingCode: EventEmitter<boolean> = new EventEmitter();
  @Output() public onSendCode: EventEmitter<string> = new EventEmitter();

  private _authService: AuthService = inject(AuthService);
  private _helper: HelperService = inject(HelperService);


  constructor() { }


  public verifyCode(): void {
    // Valido que el campo no este vacio
    if (this.code === '') {
      this._helper.toaster('Please enter the code.', 'Error', 'error');
      return;
    }
    
    this._authService.verifyCodeToResetPassword(this.code)
      .subscribe({
        next: (resp: any) => {
          if (resp.error && resp.error.code === 1) {
            this._helper.toaster(resp.error.message, 'Error', 'error');
            this.isLoadingCode = false;
            this.onSendLoadingCode.emit(this.isLoadingCode);
            return;
          }
          else if (resp.verified) {
            this.isLoadingCode = true;
            this.onSendCode.emit(this.code);
            this.onSendLoadingCode.emit(this.isLoadingCode);
            this._helper.toaster(resp.message, 'Code verified', 'success');
            return;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.isLoadingCode = false;
          this.onSendLoadingCode.emit(this.isLoadingCode);
          this._helper.toaster('An error occurred, please try again later.', 'Error', 'error');
        }
      });
  }



}
