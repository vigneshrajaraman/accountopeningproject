import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: LoginService) { }
  flag = false;
  form;
  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })


  }
  get username() {
    return this.form.get("username");
  }
  get password() {
    return this.form.get("password");
  }
  login() {
    console.log(this.form.value)
    this.service.login(this.form.value).subscribe(data => { 
      localStorage.setItem("token", data.token)
      var roles="";
      data.authority.forEach(role=>{
        if(roles!="")
        roles+=",";
        roles+=role.authority;
      })
      localStorage.setItem("roles",roles)
    },error=>{
      this.flag=true; 
    }
    )
  }

}
