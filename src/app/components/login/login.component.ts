import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuthService } from 'src/app/services/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent{
  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService, private authService: AuthService, 
    private router: Router, private activatedRoute: ActivatedRoute) {
    super(spinner)
  }

  async login(txtEmail: string, txtPassword: string) {
    this.showSpinner();
    await this.userAuthService.login(txtEmail, txtPassword, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnedUrl: string = params["returnedUrl"];
        if(returnedUrl)
        this.router.navigate([returnedUrl]).then(() => {
          window.location.reload();
        })
      })
    });
      this.hideSpinner();
    }
  }
