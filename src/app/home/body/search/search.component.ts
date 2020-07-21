import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: AppServiceService, private fb: FormBuilder, public dialog: MatDialog) { }
  spinnerFlag;
  displayedColumns = ['applicationNo', 'customer.firstName', 'accountType', 'status', 'open'];
  search;
  dataSource;

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(null);
    this.search = this.fb.group({
      applicationNo: [""],
      fromCreatedDate: [""],
      toCreatedDate: [""]
    })
  }
  onSubmit() {
    this.service.search(this.search.value).subscribe(data => {
      this.dataSource.data= data
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  openDialog(rowData) {
    console.log(rowData)
    let dialogRef = this.dialog.open(SearchDialogComponent, {
      data: { application: rowData }
    })
  }
}
