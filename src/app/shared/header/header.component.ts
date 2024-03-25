import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public loginOrProfile: string = '/login';
  public isLogged$: Observable<boolean> = new Observable<boolean>();

  private _authService: AuthService = inject(AuthService);


  constructor() {}


  ngOnInit(): void {
    this.isLogged$ = this._authService.isLogged();
    
    this.isLogged$.subscribe((isLogged: boolean) => {
      this.loginOrProfile = isLogged ? '/profile' : '/login';
    });
  }

}
