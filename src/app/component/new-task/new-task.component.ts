import { TaskService } from './../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  listId: string

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => this.listId = param['listId']
    )
  }

  createNewTask(title){
    this.taskService.createTask(title, this.listId).subscribe((newTask: any) => {
      this.router.navigate(['../'], {relativeTo : this.route})
    })
  }
}
