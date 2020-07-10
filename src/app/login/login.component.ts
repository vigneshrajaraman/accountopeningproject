import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
flag=false;
  form;
  ngOnInit(): void {
    this.form=this.fb.group({
      userName: [''],
      password:['']
    })


  }
  get userName(){
return this.form.get("userName");
  }
  get password(){
    return this.form.get("password");
      }
login(){
  
}

}
