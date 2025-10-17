import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { student } from '../../models/student';
import { Student as Student1 } from '../../services/student';
import { Auth } from '../../services/auth'


@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private ro:Router,
    private aro:ActivatedRoute,
    private ss:Student1,
    private auth:Auth
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit():void{
    if(this.loginForm.valid){
          const stud:student = this.loginForm.value;
          this.ss.login(stud).subscribe({
            next:(Student1)=>{
              this.auth.login(Student1);
              console.log(stud);
              alert("Login Successfully");
              this.ro.navigate(["/students"]);
            },
            error:()=>{
              alert("Login Fail");
            }
          });
        }else{}
  }



  isFieldInvalid(fieldName:string):boolean{
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName:string):string{
    const field = this.loginForm.get(fieldName);
    if(field?.errors){
      if(field.errors['required']) return "This field is required";
      if(field.errors['email']) return "Please Enter a valid email";
    }
    return "";
  }
}