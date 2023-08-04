import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { UserAuthService } from 'src/app/services/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})

export class PasswordResetComponent extends BaseComponent{
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private router: Router, private toastrService: CustomToastrService) {
    super(spinner)
  }

  async passwordReset(email: string){
    this.showSpinner();
    await this.userAuthService.passwordReset(email, () => {
      this.hideSpinner();
      this.toastrService.message("Şifre güncelleme maili gönderilmiştir.", "Başarılı", {
        messageType: ToastrMessageType.Success
      });
    });
  }

  cancel() {
    this.router.navigate(["/login"]);
  }
}
