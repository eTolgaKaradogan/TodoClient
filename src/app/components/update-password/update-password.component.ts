import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { UserAuthService } from 'src/app/services/models/user-auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit{
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private activatedRoute: ActivatedRoute, private router: Router, private toastrService: CustomToastrService) {
    super(spinner)
  }

  state: any;
  ngOnInit() {
    this.showSpinner();
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.hideSpinner();
        })
      }
    })
  }

  async updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner();
    if(password != passwordConfirm) {
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userAuthService.updatePassword(userId, resetToken, password, passwordConfirm, () => {
          this.router.navigate(["/login"]);
          this.toastrService.message("Şifre başarıyla güncellendi!", "Başarılı", {
            messageType: ToastrMessageType.Success
          })
        })
      }
    })
  }
}
