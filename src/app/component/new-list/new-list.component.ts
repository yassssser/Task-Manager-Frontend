import { TaskService } from './../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createNewList(title: string){
    this.taskService.createList(title).subscribe((res: any) => {
      this.router.navigate([ '/lists', res._id ]); 
    })
  } 
}
