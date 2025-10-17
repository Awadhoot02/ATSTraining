import { Routes } from '@angular/router';
import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';
import { Home } from './components/home/home';
import { Login } from './components/login/login';


export const routes: Routes = [
    {path:"",component:Home},
    {path:"students",component:StudentList},
    {path:"add-student",component:StudentForm},
    {path:"login",component:Login},
    {path:"edit-student/:id",component:StudentForm},
    {path:"**",redirectTo:""}
];
