import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DeleteDialogComponent, DeleteState } from '../dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from '../services/dialog.service';
import { TasksService } from '../services/models/tasks.service';
declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private taskService: TasksService, private dialogService: DialogService) {  }

  @Input() id : string;
  @HostListener("click")
  onClick() {
    const td: HTMLDListElement = this.element.nativeElement;

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      options: {
        width: '300px'
      }, afterClosed: async () => {
        await this.taskService.delete(this.id);
        $(td.parentElement).fadeOut(2000);
      }
    })
  }
}
