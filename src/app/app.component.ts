import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit{
  title = 'TodoClient';
  constructor(spinner: NgxSpinnerService, private authService: AuthService) {
    super(spinner)
}  

isLoggedIn: boolean;
@Output() nameSurname: string;

async ngOnInit(){
  this.isLoggedIn = await this.authService.isAuthenticated;
  this.nameSurname = localStorage.getItem("nameSurname");
}

}
