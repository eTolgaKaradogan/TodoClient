import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateTask } from 'src/app/contracts/tasks/create-task';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/custom-toastr.service';
import { TasksService } from 'src/app/services/models/tasks.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit{
  
  minDate: Date;

  constructor(spinner: NgxSpinnerService, private taskService: TasksService, private toastrService: CustomToastrService, private router: Router) {
    super(spinner)

    this.minDate = new Date();
  }

  isToday: boolean = false;
  @Output() createdTask: EventEmitter<CreateTask> = new EventEmitter();
  scheduledDate: Date;

  ngOnInit(){
    if(this.router.url == '/tasks/today')
      this.isToday = true;
  }

  async createTask(title: HTMLInputElement, description: HTMLInputElement,) {
    this.showSpinner();

    const createTask: CreateTask = new CreateTask();
    createTask.email = localStorage.getItem("email");
    createTask.title = title.value;
    createTask.description = description.value;
    debugger;
    if(this.isToday)
      createTask.scheduledDate = new Date(Date.now());
    else
      createTask.scheduledDate = this.scheduledDate;

    if(!title.value || !description.value) {
      this.toastrService.message("Göreve başlık ve açıklama giriniz.", "Dikkat!", {
        messageType: ToastrMessageType.Warning
      });
      return;
    }
    await this.taskService.create(createTask, () => {
      this.hideSpinner();
      this.toastrService.message("Görev eklendi!", "Başarılı", {
        messageType: ToastrMessageType.Success
      });
      this.createdTask.emit(createTask);
      this.scheduledDate = null;
      
    }, (error: any) => {
      this.toastrService.message(error.Message, "Hata!", {
        messageType: ToastrMessageType.Warning
      });
    })
  }
}
