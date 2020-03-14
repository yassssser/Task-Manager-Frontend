import { TaskService } from './../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any[];
  tasks: any[];

  selectedListId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.listId){
          this.selectedListId = params.listId
          this.taskService.getTask(params.listId).subscribe((task: any[]) => this.tasks = task)
        } else {
          this.tasks = undefined
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any[]) => this.lists = lists)
  }

  onClickTask(task: any){
    this.taskService.completed(task).subscribe(() => {
      task.completed = !task.completed
    })
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists'])
    })
  }

  onDeleteTaskClick(id: string){
    this.taskService.deleteTasks(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(data => data._id !== id)
    })
  }

}
