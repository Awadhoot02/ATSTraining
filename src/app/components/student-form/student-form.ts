import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import { student } from '../../models/student';
import { Student as Student1 } from '../../services/student';

@Component({
  selector: 'app-student-form',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css'
})
export class StudentForm implements OnInit {
  studentForm!: FormGroup;
  //edit
  isEdit = false;
  studentid:number | null= null;


  constructor(
  private fb: FormBuilder,
  private ro: Router,
  private aro: ActivatedRoute,
  private ss: Student1,
  ){}

  ngOnInit(): void {
      this.studentForm = this.fb.group({
        fullname:['', [Validators.required, Validators.minLength(2)]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(3)]]
      }),
      this.aro.params.subscribe(params=>{
      if (params['id']){
        this.isEdit =true;
        this.studentid =params['id'];
        this.loadstudent(Number(this.studentid));
      }
    })

  }
  loadstudent(studentid:number):void{
    this.ss.getstudents(studentid).subscribe({
      next:(Stud)=>{
        this.studentForm.patchValue({
          fullname: Stud.fullname,
          email: Stud.email,
          password:Stud.password
        });
      }
    });
  }

  onSubmit():void{
    if(this.isEdit && this.studentid){
    // console.log(this.studentForm.value);

    const stud:student =this.studentForm.value;
    this.ss.updatestudent(this.studentid,stud).subscribe({
      next:()=>{
        alert("Student Updated Successfully");
        this.ro.navigate(["/students"]);
      }
    })


  }else{
    if(this.studentForm.valid){
    // console.log(this.studentForm.value);

    const stud:student =this.studentForm.value;
    this.ss.registration(stud).subscribe({
      next:()=>{
        alert("registration succesfully completed")
      },
      error:()=>{
        alert("Registartion Successfully Completed")
      }
      
    });
  }else{}
}
  
}
isFieldInvalid(fieldName:string):boolean{
    const field = this.studentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName:string):string{
    const field = this.studentForm.get(fieldName);
    if(field?.errors){
      if(field.errors['required']) return "This field is required";
      if(field.errors['email']) return "Please Eenter a valid email";
    }
    return "";
  }
}
