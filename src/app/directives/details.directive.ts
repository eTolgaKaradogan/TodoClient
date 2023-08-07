import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ListComponent } from '../components/tasks/list/list.component';
import { TaskDetailDialogComponent } from '../dialogs/task-detail-dialog/task-detail-dialog.component';
import { DialogService } from '../services/dialog.service';
declare var $ : any;

@Directive({
  selector: '[appDetails]'
})
export class DetailsDirective {

  constructor(private element: ElementRef, private dialogService: DialogService) { }


  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Input() id: string;
  @HostListener("click")
  async onClick() {
    const td: HTMLDListElement = this.element.nativeElement;

    this.dialogService.openDialog({
      componentType: TaskDetailDialogComponent,
      data: this.id,
      options: {
        width: '1000px'
      }, afterClosed:async () => {
        this.callback.emit();
      }
    });
  }

}
