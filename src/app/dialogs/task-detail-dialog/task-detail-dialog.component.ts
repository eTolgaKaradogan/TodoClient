import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/contracts/tasks/task';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { TasksService } from 'src/app/services/models/tasks.service';

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent implements OnInit{
  minDate: Date;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private taskService: TasksService,
    private toastrService: CustomToastrService
  ) { 
    this.minDate = new Date();
  }

  task: Task;
  displayColumns: string[] = ['title', 'description', 'scheduledDate'];
  dataSource;
  clickedRows = new Set<any>();
  scheduledDate: Date;

  async ngOnInit() {
    const data = await this.taskService.getById(this.data);
    this.task = data.task;
    this.scheduledDate = this.task.scheduledDate;
  }

  async update(title: HTMLInputElement, description: HTMLInputElement) {
    await this.taskService.update(this.task.id, title.value, description.value, this.scheduledDate, () => {
      this.toastrService.message("Görev güncellendi!", "Başarılı", {
        messageType: ToastrMessageType.Success
      });
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}