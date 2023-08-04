import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateUserResponse } from 'src/app/contracts/users/create-user-response';
import { User } from 'src/app/contracts/users/user';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { UserAuthService } from 'src/app/services/models/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit{
  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private userAuthService: UserAuthService, spinner: NgxSpinnerService, private toastrService: CustomToastrService) {
    super(spinner)
  }  

  form: UntypedFormGroup;

   async ngOnInit(){
    this.form = this.formBuilder.group({
      nameSurname: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(5)], Validators.email],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.form.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {
    this.submitted = true;

    if(this.form.invalid)
      return;

    const result: CreateUserResponse = await this.userAuthService.register(user);
    if(result.succeeded) {
      this.router.navigate(["/login"]);
      this.toastrService.message("Başarıyla kayıt olundu!", "Başarılı", {
        messageType: ToastrMessageType.Success
      })
    } else {
      this.toastrService.message(result.message, "Hata!", {
        messageType: ToastrMessageType.Warning
      });
    }
  }

}
