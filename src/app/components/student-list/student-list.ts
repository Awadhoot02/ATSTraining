import { Component } from '@angular/core';
import { student } from '../../models/student';
import { Student as Student1 } from '../../services/student';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({  
  selector: 'app-student-list',
  imports: [CommonModule, RouterLink,],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList {
  students:student[]=[];

  constructor(private ss:Student1){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadStudent();
    
  }

  loadStudent():void{
    this.ss.getAllstudents().subscribe({
      next:(data)=>{ this.students = data; this.students.sort((a, b) => {
      const idA = a.id ?? 0;  // if a.id is undefined, treat as 0
      const idB = b.id ?? 0;  // if b.id is undefined, treat as 0
      return idA - idB;
    })}
  });
  }
  deleteStudent(id:number):void{
    this.ss.deleteStudent(id).subscribe({
      next:()=>{this.loadStudent();}
    });
  }





selectedStudents:number[]=[];
  
  selectIds(id:number):void{
    const index = this.selectedStudents.indexOf(id);

    if(index >-1 ){
      this.selectedStudents.splice(index,1);
    }else{
      this.selectedStudents.push(id);
    }
  }

    deletemultiplestudents():void{
    this.ss.deletemultiplestudents(this.selectedStudents).subscribe({
      next:()=>{
        this.loadStudent();
        this.selectedStudents=[];
      },
      error:() =>{
        alert("Error");
      }
    });
  }
  }
  