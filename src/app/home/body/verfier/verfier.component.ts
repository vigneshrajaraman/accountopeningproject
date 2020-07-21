import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AppServiceService } from '../service/app-service.service';
import { MatDialog } from '@angular/material/dialog';
import { VerfierDialogComponent } from './verfier-dialog/verfier-dialog.component';
import { CountService } from '../service/count.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-verfier',
  templateUrl: './verfier.component.html',
  styleUrls: ['./verfier.component.css']
})
export class VerfierComponent implements OnInit {

  dataSource;
  spinnerFlag;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['applicationNo', 'customer.firstName', 'accountType', 'status', 'open'];

  constructor(private count: CountService, private service: AppServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAllVerifierData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })

  }

  openDialog(rowData) {
    let dialogRef = this.dialog.open(VerfierDialogComponent, {
      data: { application: rowData }
    })

    dialogRef.afterClosed().subscribe(data => {
      this.spinnerFlag = true;
      console.log(data);
      this.service.setAllVerifierStatus(data).subscribe((response) => {
        this.service.getCountVerifier().subscribe(data=>{
          this.service.getCountRework().subscribe(data1=>{
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
