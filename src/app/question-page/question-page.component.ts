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
  Math: Math;
  alertstring: any;
  alertlength: number;
  answer: any;
  constructor(
    
    private adminService: AdminService,
    private router: Router,
    private formBuilder : FormBuilder
  ) { }
    
  ngOnInit() {
    
    this.adminService.fetchUser().subscribe(Player => {
      this.player = Player;
      if(Player.isNotBan==false){
        this.router.navigate(['/']);}
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
    const alertmessages:string[]= new Array("Tumse na ho payega","Error 404 Brain not found","My Granny can do better","Not even close","Nothing") 
    this.alertlength= Math.abs(Math.floor(Math.random()*(alertmessages.length-1)))%alertmessages.length;
    console.log(this.alertlength);
    this.alertstring=alertmessages[this.alertlength];
    this.ansForm.reset();
    this.adminService.submission(form).subscribe(info=>{
      if(info.success){
        console.log('success');
        window.location.reload();
      }
      else{
        this.myFunction();
        console.log('fail');
      }
      
    },
    err => {
      console.log(err)
      return false
    })
  }
  myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
