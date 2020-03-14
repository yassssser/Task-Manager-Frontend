import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string){
    // send to web request to create the list
    return this.webReqService.post('lists', { title })
  }

  createTask(title: string, listId: string){
    // send to web request to create the list
    return this.webReqService.post(`lists/${listId}/tasks`, { title })
  }

  getLists(){
    return this.webReqService.get('lists')
  }

  getTask(listId){
    return this.webReqService.get(`lists/${listId}/tasks`)
  }

  completed(task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    })
  }

  deleteList(id: string){
    return this.webReqService.delete(`lists/${id}`)
  }

  deleteTasks(listId: string, taskId: string){
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`)
  }

  updateList(id, title){
    return this.webReqService.patch(`lists/${id}`, { title })
  }

  updateTask(listId, taskId, title){
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title })
  }
}
