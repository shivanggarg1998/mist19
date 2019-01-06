import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  constructor(private http : Http) { }

  fetchUser(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('userdetail',{headers : headers})
    .map(res => res.json());
  }

  fetchQuestion(){
    let headers = new Headers()
  //  let params = new URLSearchParams();
  //  params.set('id',id.toString())
    headers.append('Content-Type','application/json')
    return this.http.get('/questionpage')
    .map(res => res.json())
  }

  submission(ans){
    let headers = new Headers()
    headers.append('Content-Type','application/json')
    let body = JSON.stringify(ans);
    return this.http.post('/submit',body,{headers : headers})
    .map(res => res.json())
  }

  addQuestion(questions){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let body = JSON.stringify(questions);
    console.log(body);
    return this.http.post('/admin/addQuestions/', body, {headers: headers} )
    .map(res => res.json());
  }

}
