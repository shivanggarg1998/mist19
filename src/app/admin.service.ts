import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  constructor(private http : Http) { }


  addQuestion(questions){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let body = JSON.stringify(questions);
    console.log(body);
    return this.http.post('/admin/addQuestions/', body, {headers: headers} )
    .map(res => res.json());
  }

}
