import { Component, OnInit } from '@angular/core';
import { Task } from '../../../services/tasks/task';
import { TaskService } from '../../../services/tasks/task-service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  newTask: Task = { id: 0, title: '', status: '' };
  taskId: number = 0;
  searchTerm: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
    this.taskService.taskAdded.subscribe((newTask: Task) => {
      this.taskId = newTask.id;
      this.tasks.push(newTask);
      this.filterTasks(); 
    });
  }

  async loadTasks() {
    try {
      this.tasks = await this.taskService.getTasks();
      this.filterTasks(); 
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  async addTask() {
    try {
      if (this.newTask.title.trim() !== '') {
        await this.taskService.addNewTask(this.newTask);
        this.newTask.title = '';
        console.log(this.tasks);
      } else {
        console.error("Titulo nao pode ser vazio");
      }
    } catch (error) {
      console.log(error);
    }
  }

  searchTasks() {
    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getTaskStatusClass(status: string): string {

    switch (status.toLowerCase()) {
      case 'em aberto':
        return 'task-open';
      case 'concluído':
        return 'task-completed';
      case 'em progresso':
        return 'task-in-progress';
      default:
        return '';
    }
  }

}
