import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { UserAuthService } from 'src/app/services/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent{
  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService, private authService: AuthService, 
    private router: Router, private toastrService: CustomToastrService) {
    super(spinner)
  }

  async login(txtEmail: string, txtPassword: string) {
    this.showSpinner();
    await this.userAuthService.login(txtEmail, txtPassword, () => {
      this.authService.identityCheck();
      this.toastrService.message("başarılı", "", {
        messageType: ToastrMessageType.Success
      })
      this.router.navigate(['/tasks'])
        .then(() => {
      window.location.reload();
    });
      this.hideSpinner();
    })
  }

}
