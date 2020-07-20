import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private service: AppServiceService, private fb:FormBuilder) { }

  displayedColumns = ['applicationNo', 'customer.firstName', 'accountType', 'status', 'open'];
  search;
  dataSource;
  
  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(null);
this.search= this.fb.group({
  application:[""],
  createfromdate:[""],
  createtodate:[""]
})
  }
}
