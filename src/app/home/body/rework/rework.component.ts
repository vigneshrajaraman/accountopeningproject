import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AppServiceService } from '../service/app-service.service';
import { MatDialog } from '@angular/material/dialog';
import { VerfierDialogComponent } from '../verfier/verfier-dialog/verfier-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ReworkDialogComponent } from './rework-dialog/rework-dialog.component';
import { CountService } from '../service/count.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rework',
  templateUrl: './rework.component.html',
  styleUrls: ['./rework.component.css']
})
export class ReworkComponent implements OnInit {

  dataSource;
  spinnerFlag;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['applicationNo', 'customer.firstName', 'accountType', 'status', 'open'];

  constructor(private service: AppServiceService, public dialog: MatDialog, private count: CountService) { }

  ngOnInit() {
    this.service.getAllReworkData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })

  }

  openDialog(rowData) {
    console.log("rowdata", rowData)
    let dialogRef = this.dialog.open(ReworkDialogComponent, {
      data: { application: rowData }
    })

    dialogRef.afterClosed().subscribe(da => {
      this.spinnerFlag = true;
      console.log("REQUESTDA", da);
      this.service.updateApplication(da).subscribe((response) => {
        this.service.getCountVerifier().subscribe(data => {
          this.service.getCountRework().subscribe(data1 => {
            this.count.setverifierCount(data);
            this.count.setReworkCount(data1);
            this.spinnerFlag = false;
            console.log(response);
            this.ngOnInit();
          })
        })

      })
    })
  }

}
