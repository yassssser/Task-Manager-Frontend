import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './component/task-view/task-view.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewListComponent } from './component/new-list/new-list.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { LoginViewComponent } from './component/login-view/login-view.component'
import { WebRequestIterceptor } from './service/web-req.iterceptor';
import { SignupViewComponent } from './component/signup-view/signup-view.component';
import { EditListComponent } from './component/edit-list/edit-list.component';
import { EditTaskComponent } from './component/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginViewComponent,
    SignupViewComponent,
    EditListComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestIterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
