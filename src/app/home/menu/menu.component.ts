import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountService } from '../body/service/count.service';
import { AppServiceService } from '../body/service/app-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private count: CountService, private service: AppServiceService) { }
  roles: string;
  role: string[];
  verifierCount: Number = 0;
  reworkCount: Number = 0;
  ngOnInit(): void {
    this.roles = localStorage.getItem("roles")
    this.role = this.roles.split(",");
    if (this.reworkCount != null || this.verifierCount != null) {
      this.service.getCountVerifier().subscribe(data => {
        this.service.getCountRework().subscribe(data1 => {
          this.count.setverifierCount(data);
          this.count.setReworkCount(data1);
        })
      })
    }
    this.count.getverifierCount().subscribe(co => {
      this.verifierCount = co;
      console.log("verifiercoun", this.verifierCount)
    })
    this.count.getReworkCount().subscribe(co => {
      this.reworkCount = co;
      console.log("reworkCount", this.reworkCount)
    })
  }

}
