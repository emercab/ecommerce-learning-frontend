import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../../../helpers/helper.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public name: string = '';
  public email: string = '';
  public address: string = '';
  public phone: string = '';
  public password: string = '';

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _helper: HelperService = inject(HelperService);


  constructor() { }


  public register(): void {

    if (!this.name || !this.email || !this.address || !this.phone || !this.password) {
      this._helper.toaster('All fields are required.', 'Error', 'error');
      return;
    }

    const data = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
      password: this.password
    };

    this._authService.register(data)
      .subscribe((resp: any) => {
        if (resp) {
          this._helper.toaster('User registered successfully.', 'Success', 'success');
          this._router.navigate(['/login']);
        }
      });
  }

}
