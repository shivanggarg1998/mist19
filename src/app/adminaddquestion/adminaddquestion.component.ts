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
    url: String;
    question_number: Number;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminService.fetchUser().subscribe(Player => {
      console.log(Player.isAdmin);
      if(Player.isAdmin==false){
        this.router.navigate(['/']);
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onQuestionSubmit(){
    const questions = {
      question_body: this.question_body,
    answer: this.answer,
    question_number: this.question_number,
    url: this.url
      
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

