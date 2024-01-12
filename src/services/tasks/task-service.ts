import { EventEmitter, Injectable } from "@angular/core";
import { api } from "../api";
import { Task } from "./task";

const ENDPOINT = "tasks"

@Injectable({
    providedIn: 'root',
})

export class TaskService {

    private lastId: number = 0;
    taskAdded = new EventEmitter<Task>();

    async getTasks() {
        const response = await api.get(ENDPOINT);
        return response.data;
    };

    async deleteTask(id: number) {
        try {
            const response = await api.delete(`${ENDPOINT}/${id}`);
            console.log('Deleted task:', response.data);
        } catch (error) {
            console.error('Error deleting task: ', error);
        }
    };

    async updateTask(id: number, data: Task) {
        try {
            await api.put(`${ENDPOINT}/${id}`, data);
        } catch (error) {
            console.error(error);
            throw error;    
        }
    };

    /* getTaskId(id: number){
      const response = await api.get(`${ENDPOINT}/${id}`);
      return response.data;
    }; */

    async addNewTask(data: Task) {
        const newTask: Task = { ...data, status: 'Em aberto', id: ++this.lastId };
        await api.post(ENDPOINT, newTask);
        this.taskAdded.emit(newTask);
    };
}