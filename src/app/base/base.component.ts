import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner() {
    this.spinner.show();

    setTimeout(() => this.hideSpinner(), 700);
  }

  hideSpinner() {
    this.spinner.hide();
  }
}