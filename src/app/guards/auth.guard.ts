import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType } from '../services/custom-toastr.service';
import { _isAuthenticated } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      this.spinner.show();

      if(!_isAuthenticated) {
        this.router.navigate(["login"], { queryParams: { returnedUrl: state.url }});
        this.toastrService.message("Giriş yapmanız gerekiyor!", "Yetkisiz Erişim!", {
          messageType: ToastrMessageType.Warning
        })
      }
      this.spinner.hide();
    return true;
  }
  
}
