import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
roles:string;
role:string[];

  ngOnInit(): void {
    this.roles=localStorage.getItem("roles")
    this.role=this.roles.split(",");
    
  }

}
