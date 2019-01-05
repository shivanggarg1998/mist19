import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-adminaddquestion',
  templateUrl: './adminaddquestion.component.html',
  styleUrls: ['./adminaddquestion.component.css']
})
export class AdminaddquestionComponent implements OnInit {

  question_body: String;
    media_link: String;
    answer: String;
    question_number: Number;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onQuestionSubmit(){
    const questions = {
      question_body: this.question_body,
    media_link: this.media_link,
    answer: this.answer,
    question_number: this.question_number
      
    }
    this.adminService.addQuestion(questions).subscribe(data => {
        if(data.success){
          console.log("saved");
          this.router.navigate(['/admin/addQuestion']);
        }
        else{
          console.log('not saved');
          this.router.navigate(['/admin/addQuestion']);
        }
    });
    }

}

