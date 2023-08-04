import { ChangeDetectorRef, AfterContentChecked,Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListTask } from 'src/app/contracts/tasks/list-tasks';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { DialogService } from 'src/app/services/dialog.service';
import { TasksService } from 'src/app/services/models/tasks.service';
import dateFormat from "dateformat";
import { TaskDetailDialogComponent } from 'src/app/dialogs/task-detail-dialog/task-detail-dialog.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { delay, startWith, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
declare var $ : any;

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.scss']
})
export class CompletedListComponent extends BaseComponent implements OnInit, OnDestroy{
  private searchSub: Subscription;
  private datesSub: Subscription;
  
  constructor(private taskService: TasksService, spinner: NgxSpinnerService, private toastrService: CustomToastrService, public dialog: MatDialog, private dialogService: DialogService, 
    private commonService: CommonService) {
    super(spinner)

    this.searchSub = this.commonService.getSearchUpdate().pipe(delay(0)).subscribe(async searchForm => {
      this.searchForm = searchForm;
    });

    this.datesSub = this.commonService.getDates().subscribe(async dates => {
      await this.getTasks(dates.startDate, dates.endDate);
    });
}  

  tasks: ListTask[];
  searchForm;

  async ngOnInit() {
    await this.getTasks(null, null);
    let createApp = document.getElementById('createApp');
    createApp.hidden = true;

    let dateRangeApp = document.getElementById('dateRangeApp');
    dateRangeApp.hidden = false;
  }
  
  ngOnDestroy(){
    this.datesSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  async getTasks(startDate: Date | null, endDate: Date | null) {
    this.showSpinner();
    const data: {tasks: ListTask[]} = await this.taskService.list(localStorage.getItem("email"), () => this.hideSpinner(),
    (error) => 
    this.toastrService.message(error, "Hata!", {
      messageType: ToastrMessageType.Error
    }));

    data.tasks = data.tasks.filter(t => t.completedDate != null);
    data.tasks.forEach(t => {
      t.scheduledDate != null ? t.scheduledDate = dateFormat(new Date(t.scheduledDate).toUTCString(), "dd.mm.yyyy") : null
    });
    
    if(startDate != null || endDate != null) {
      this.tasks = data.tasks.filter(t => t.scheduledDate >= startDate && t.scheduledDate <= endDate);
    }
    else {
      this.tasks = data.tasks;
  };
}

  async details(id: string) {
    this.dialogService.openDialog({
      componentType: TaskDetailDialogComponent,
      data: id,
      options: {
        width: '1000px'
      }, afterClosed:async () => {
        await this.getTasks(null, null);
      }
    });
  }
    delete(id: string, event) {
      this.dialogService.openDialog({
        componentType: DeleteDialogComponent,
        data: DeleteState.Yes,
        options: {
          width: '300px'
        }, afterClosed: async () => {
          await this.taskService.delete(id);
          const img: HTMLImageElement = event.srcElement;
          $(img.parentElement.parentElement).fadeOut(2000);
        }
      })
    }
  }