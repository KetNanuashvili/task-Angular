import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { log } from 'node:console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskArr: Task[] = [];
  taskObj: Task = new Task();
  addTaskValue: string = '';
  editTaskValue: string='';
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.editTaskValue='';
    this.addTaskValue='';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: res => {
        this.taskArr = res;
      },
      error: err => {
        console.error('Error fetching tasks:', err);
        console.log('Unable to get list of tasks');
      }
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.taskService.addTask(this.taskObj).subscribe({
      next: res => {
        this.ngOnInit();
        this.addTaskValue = ''; 
      },
      error: err => {
        console.error('Error adding task:', err);
        console.log('Failed to add task');
      }
    });
  }

  editTask() {
    this.taskObj.task_name=this.editTaskValue;
    this.taskService.editTask(this.taskObj).subscribe({
      next: res => {
        this.ngOnInit();
        console.log(this.ngOnInit());
        
      },
      error: err => {
        console.error('Failed to update task', err);
      }
    });
  }

  deleteTask(etask: Task) {
    this.taskService.deleteTask(etask).subscribe({
      next: res => {
        this.ngOnInit();
      },
      error: err => {
        console.error('Failed to delete task', err);
      }
    });
  }

  call(etask: Task){
    this.taskObj= etask;
    this.editTaskValue=etask.task_name;
    
  }
  
}
