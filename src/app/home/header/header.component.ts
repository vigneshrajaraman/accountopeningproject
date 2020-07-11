import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }
  username;
  roles;
  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.roles= localStorage.getItem("roles");
  }
  logout(){
    localStorage.clear();
this.route.navigate(["login"]);
  }
}
