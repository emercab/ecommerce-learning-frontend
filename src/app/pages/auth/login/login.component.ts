import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  constructor(private _toastr: ToastrService) {}


  ngOnInit(): void {
    this.showSuccess();
  }


  public showSuccess() {
    this._toastr.success('Hello world!', 'Toastr fun!');
  }
}
