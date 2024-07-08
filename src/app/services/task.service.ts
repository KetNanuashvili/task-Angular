import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private serviceURL: string = 'http://localhost:3001/tasks'; 
  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.serviceURL}/${task.id}`);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task);
  }
}
