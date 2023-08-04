import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTask } from 'src/app/contracts/tasks/create-task';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private commonService: CommonService) {}

  async ngOnInit() {
    if (!(await this.authService.isAuthenticated)) {
      this.router.navigate(['/login']);
    }
  }
  
  async createdTask(createdTask: CreateTask) {
    this.commonService.sendAddedUpdate(true);
  }
}
