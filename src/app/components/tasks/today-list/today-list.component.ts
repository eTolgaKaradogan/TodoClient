import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListTask } from 'src/app/contracts/tasks/list-tasks';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { TasksService } from 'src/app/services/models/tasks.service';
import dateFormat from "dateformat";
import { CreateTask } from 'src/app/contracts/tasks/create-task';
import { CommonService } from 'src/app/services/common.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-today-list',
  templateUrl: './today-list.component.html',
  styleUrls: ['./today-list.component.scss']
})
export class TodayListComponent extends BaseComponent implements OnInit, OnDestroy{
  private subs: Subscription;
  private searchSub: Subscription;
  
  constructor(private taskService: TasksService, spinner: NgxSpinnerService, private toastrService: CustomToastrService, private commonService: CommonService) {
    super(spinner)

    this.subs = this.commonService.getAddedUpdate().subscribe(async message => {
      await this.getTasks(null, null);
    })

    this.searchSub = this.commonService.getSearchUpdate().pipe(delay(0)).subscribe(async searchForm => {
      this.searchForm = searchForm;
    });
  }

  tasks: ListTask[];
  searchForm;

  async ngOnInit(){
    await this.getTasks(null, null);

    let dateRangeApp = document.getElementById('dateRangeApp');
    dateRangeApp.hidden = true;

    let createApp = document.getElementById('createApp');
    createApp.hidden = false;

    let dateRangeInCreateApp = document.getElementById('dateRangeInCreateApp')
    dateRangeInCreateApp.hidden = true;
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
    this.searchSub.unsubscribe();
  }

  async getTasks(startDate: Date | null, endDate: Date | null) {
    this.showSpinner();
    const data: {tasks: ListTask[]} = await this.taskService.list(localStorage.getItem("email"), () => this.hideSpinner(),
    (error) => 
    this.toastrService.message(error, "Hata!", {
      messageType: ToastrMessageType.Error
    }));

    data.tasks = data.tasks.filter(t => t.completedDate == null);
    data.tasks.forEach(t => {
      t.scheduledDate != null ? t.scheduledDate = dateFormat(new Date(t.scheduledDate).toUTCString(), "dd.mm.yyyy") : null
    });

    let todaysDate: Date = dateFormat(new Date(Date.now()).toUTCString(), "dd.mm.yyyy")

    this.tasks = data.tasks.filter(t => t.scheduledDate == todaysDate);
  }

  async createdTask(createdTask: CreateTask) {
    await this.getTasks(null, null);
  }
}