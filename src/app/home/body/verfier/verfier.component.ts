import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AppServiceService } from '../service/app-service.service';
import { MatDialog } from '@angular/material/dialog';
import { VerfierDialogComponent } from './verfier-dialog/verfier-dialog.component';

@Component({
  selector: 'app-verfier',
  templateUrl: './verfier.component.html',
  styleUrls: ['./verfier.component.css']
})
export class VerfierComponent implements OnInit {

  dataSource;
  spinnerFlag;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['applicationNo', 'customer.firstName', 'accountType', 'status','open'];

  constructor(private service: AppServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getAllVerifierData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })

  }
  
  openDialog(rowData){
    this.dialog.open(VerfierDialogComponent,{
      data:{application:rowData}
    })

  this.dialog.afterAllClosed.subscribe(data=>{
    this.spinnerFlag= true;

    this.service.setAllVerifierStatus(data).subscribe((response)=>{

    })
  })
  }

}
