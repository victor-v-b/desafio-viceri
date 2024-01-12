import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-app';
}
