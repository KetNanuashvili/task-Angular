import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskArr: Task[] = [];
  taskObj: Task=new Task();
  addTaskValue: string='';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskObj=new Task();
    this.taskArr= [];
    this.getAllTasks();

  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      res => {
        this.taskArr = res;
      },
      err => {
        console.error('Error fetching tasks:', err);
        console.log('Unable to get list of tasks');
      }
    );
  }
  
  addTask() {
    this.taskObj.task_name = this.addTaskValue
    this.taskService.addTask(this.taskObj).subscribe(
      res => {
        this.ngOnInit();
        this.addTaskValue =''; 
      },
      err => {
        console.error('Error adding task:', err);
        console.log('Failed to add task');
      }
    );
  }

editTask(){
  this.taskService.editTask(this.taskObj).subscribe(res=>{
    this.ngOnInit
  }, err=>{
    alert('failed to update task');
  })
}

deleteTask(etask: Task){
  this.taskService.deleteTask(etask).subscribe(res=>{
    this.ngOnInit();
  }, err=>{
    alert('failed to delete task')
  })
}
}  
