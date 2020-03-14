import { EditTaskComponent } from './component/edit-task/edit-task.component';
import { EditListComponent } from './component/edit-list/edit-list.component';
import { SignupViewComponent } from './component/signup-view/signup-view.component';
import { LoginViewComponent } from './component/login-view/login-view.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { NewListComponent } from './component/new-list/new-list.component';
import { TaskViewComponent } from './component/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'lists', component: TaskViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'signup', component: SignupViewComponent },
  { path : 'new-list', component : NewListComponent },
  { path : 'lists/:listId/new-task', component : NewTaskComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
