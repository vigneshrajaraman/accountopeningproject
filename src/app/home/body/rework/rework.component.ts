import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AppServiceService } from '../service/app-service.service';
import { MatDialog } from '@angular/material/dialog';
import { VerfierDialogComponent } from '../verfier/verfier-dialog/verfier-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ReworkDialogComponent } from './rework-dialog/rework-dialog.component';

@Component({
  selector: 'app-rework',
  templateUrl: './rework.component.html',
  styleUrls: ['./rework.component.css']
})
export class ReworkComponent implements OnInit {

  dataSource;
  spinnerFlag;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  displayedColumns = ['applicationNo', 'customer.firstName', 'accountType', 'status', 'open'];

  constructor(private service: AppServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAllReworkData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })

  }

  openDialog(rowData) {
    let dialogRef = this.dialog.open(ReworkDialogComponent, {
      data: { application: rowData }
    })

    dialogRef.afterClosed().subscribe(data => {
      this.spinnerFlag = true;
      console.log(data);
      this.service.updateApplication(data).subscribe((response) => {
        this.spinnerFlag = false;
        this.ngOnInit();

      })
    })
  }

}
