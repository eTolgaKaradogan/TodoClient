import { Component, OnInit } from '@angular/core';
import { CreateTask } from 'src/app/contracts/tasks/create-task';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent{
  constructor(private commonService: CommonService) {}
  
  async createdTask(createdTask: CreateTask) {
    this.commonService.sendAddedUpdate(true);
  }
}
