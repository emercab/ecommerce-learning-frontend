import { Component } from '@angular/core';
import { ForgottenPasswordCodeComponent } from '../forgotten-password-code/forgotten-password-code.component';
import { SetNewPasswordComponent } from '../set-new-password/set-new-password.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ForgottenPasswordCodeComponent,
    SetNewPasswordComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

}
