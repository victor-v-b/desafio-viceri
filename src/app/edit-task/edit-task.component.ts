import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/tasks/task-service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  /* constructor(public dialogRef: MatDialogRef<EditTaskComponent>) {} */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditTaskComponent>, private taskService: TaskService) {}

  async saveChanges() {
    
    try {
      await this.taskService.updateTask(this.data.task.id, this.data.task);
      // Optionally, you can reload the tasks after deletion
      console.log('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle the error appropriately (e.g., show a message to the user)
    }

    console.log('Mudanças salvas:', this.data.task);
    this.dialogRef.close();
  }

}
