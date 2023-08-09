import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit{
  constructor(private authService: AuthService, spinner: NgxSpinnerService, private router: Router) {
    super(spinner)
  }
  
  isLoggedIn: any;
  @Input() nameSurname: string;

  async ngOnInit(){
    this.isLoggedIn = await this.authService.identityCheck();
    debugger;
  }

  getNameSurname() {
    return localStorage.getItem("nameSurname");
  }

  async signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate(['/login'])
        .then(() => {
          
      window.location.reload();
    });
  }
}
