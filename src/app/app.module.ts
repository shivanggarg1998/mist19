import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { AdminaddquestionComponent } from './adminaddquestion/adminaddquestion.component';
import { AdminService} from './admin.service';
const appRoutes: Routes = [
  { path:'question-page', component : QuestionPageComponent },
  { path: 'admin/addQuestion', component: AdminaddquestionComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    QuestionPageComponent,
    AdminaddquestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
