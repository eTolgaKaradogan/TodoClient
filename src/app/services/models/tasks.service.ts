import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { CreateTask } from 'src/app/contracts/tasks/create-task';
import { ListTask } from 'src/app/contracts/tasks/list-tasks';
import { Task } from 'src/app/contracts/tasks/task';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClientService: HttpClientService) { }

  async create(task: CreateTask, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<any> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "tasks",
    }, task);

    const promiseData = firstValueFrom(observable);
    
    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.error));

      return await promiseData;
  }

  async list(email: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{tasks: ListTask[]}> {
    const observable: Observable<{tasks: ListTask[]}> = this.httpClientService.get<{tasks: ListTask[]}>({
      controller: "tasks",
      queryString: `email=${email}`
    });
    const promiseData = firstValueFrom(observable);

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.error));

      return await promiseData;
  }

  async getById(id:string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<{task: Task}> = this.httpClientService.get<{task: Task}>({
      controller: "tasks",
      action: "get-by-id",
      queryString: `id=${id}`
    });
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));
    return await promiseData;
  }

  async delete(id: string) {
    const observable: Observable<any> =this.httpClientService.delete<any>({
      controller: "tasks"
    }, id);

    await firstValueFrom(observable);
  }

  async update(id: string, title: string, description: string, scheduledDate: Date, successCallBack?: () => void) {
    const observable = this.httpClientService.put({
      controller: "tasks"
    }, {
      id, title, description, scheduledDate
    });

    await firstValueFrom(observable);
    successCallBack();
  }

  async complete(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<any> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: "tasks",
      action: "complete-task"
    }, { id });

    const promiseData = firstValueFrom(observable);
    
    promiseData.then(d => successCallBack())
    .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.error));
      return await promiseData;
    }
}
