import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, student, student as Student1 } from '../models/student';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Student {
  private myurl="http://localhost:3000/api";

  constructor(private http:HttpClient){}
  private getHeaders(): HttpHeaders{
    return new HttpHeaders({'Content-Type':'application/json'})
  }

  registration(stud:Student1):Observable<Student1>{
    return this.http.post<Student1>(`${this.myurl}/register`, stud,{headers:this.getHeaders()});

  }
  getAllstudents():Observable<Student1[]>{
  return this.http.get<Student1[]>(`${this.myurl}/student`,{headers:this.getHeaders()});

}
deleteStudent(id:number):Observable<any>{
  return this.http.delete(`${this.myurl}/deletestudent/${id}`,{headers:this.getHeaders()});
}
getstudents(id:number):Observable<Student1>{
  return this.http.get<Student1>(`${this.myurl}/student/${id}`,{headers:this.getHeaders()});
}
updatestudent(id:number, stud:Student1):Observable<Student1>{
  return this.http.patch<Student1>(`${this.myurl}/updatestudent/${id}`,stud,{headers:this.getHeaders()});
}
deletemultiplestudents(ids:number[]):Observable<any>{
  return this.http.delete<Student1>(`${this.myurl}/deletemultiplestudents`,{body:ids,headers:this.getHeaders()});
}
login(stud:LoginRequest):Observable<Student1>{
    return this.http.post<Student1>(`${this.myurl}/login`,stud,{headers:this.getHeaders()});
  }
}
