import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {
  player: any;
  question: any;
  ansForm : FormGroup;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.adminService.fetchUser().subscribe(Player => {
      this.player = Player;
    },
    err => {
      console.log(err);
      return false;
    });
    this.adminService.fetchQuestion().subscribe(Question=>{
      this.question= Question;
    },
    err=>{
      console.log(err);
      return false;
    });

    this.ansForm = this.formBuilder.group({
      answer : ['', Validators.required]
    })

  }
  ansSubmission(form: any){
    this.ansForm.reset();
    this.adminService.submission(form).subscribe(info=>{
      if(info.success){
        console.log('success');
        window.location.reload();
      }
      else{
        console.log('fail');
      }
      
    },
    err => {
      console.log(err)
      return false
    })
  }

}
