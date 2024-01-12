import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../services/tasks/task';
import { TaskService } from '../../../services/tasks/task-service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../../edit-task/edit-task.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task: Task = {} as Task;
  @Input() taskId: number = 0

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

    async deleteTask() {
      try {
        await this.taskService.deleteTask(this.taskId);
        console.log('enviado para deleção: id ', this.taskId);
      } catch (error) {
        console.error(error);
      }
    }

  onEditClick() {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '300px', 
      data: { task: {...this.task} } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Fechado.');
    });
  }

}
