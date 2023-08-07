import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType } from '../services/custom-toastr.service';
import { TasksService } from '../services/models/tasks.service';
declare var $: any;

@Directive({
  selector: '[appComplete]'
})
export class CompleteDirective{

  constructor(private element: ElementRef, private taskService: TasksService, private spinner: NgxSpinnerService, private toastrService: CustomToastrService) { }

  @Input() id : string;
  @HostListener("click")
  async onClick() {
    const td: HTMLDListElement = this.element.nativeElement;

    debugger;
    this.spinner.show();
    await this.taskService.complete(this.id, () => {
      this.spinner.hide();
      this.toastrService.message("Görev tamamlandı!", "Başarılı", {
        messageType: ToastrMessageType.Success
      });
        $(td.parentElement).fadeOut(2000);
    }, (error: any) => {
      this.toastrService.message(error.Message, "Hata!", {
        messageType: ToastrMessageType.Warning
      });
    })
  }
}
