import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private auth:Auth, private ro:Router){}

  isLoggedIn = false;

  ngOnInit(){
    this.auth.currentUser$.subscribe(user=>{
      this.isLoggedIn = !!user;
    })
  }

  logout():void{
    this.auth.logout();
    alert("Logout Successfully");
    this.ro.navigate(["/login"]);
  }

}