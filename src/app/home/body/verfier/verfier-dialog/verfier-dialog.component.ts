import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Application } from 'src/app/model/application';
import { Gender } from 'src/app/model/gender';
import { EmployeeType } from 'src/app/model/employeeType';
import { AccountType } from 'src/app/model/accountType';
import { CardType } from 'src/app/model/cardType';
import { AppServiceService } from '../../service/app-service.service';
import { Status } from 'src/app/model/status';

@Component({
  selector: 'app-verfier-dialog',
  templateUrl: './verfier-dialog.component.html',
  styleUrls: ['./verfier-dialog.component.css']
})
export class VerfierDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<VerfierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: AppServiceService) { }
  employeeForm;
  customerForm;
  applicationForm;
  genders: string[] = new Array();
  employeeTypes: string[] = new Array();
  accountTypes: string[] = new Array();
  cardTypes: string[] = new Array();
  usAmount = 0;
  errorFlagEmployee;
  errrorflagCustomer;
  errorFlagApplication;
  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      employeeId: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      designation: [{ value: '', disabled: true }, Validators.required],
      employeeType: [{ value: '', disabled: true }],
      salary: [{ value: '', disabled: true }, [Validators.required]]
    });

    this.customerForm = this.fb.group({
      customerId: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }, [Validators.required]],
      middleName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      employee: this.employeeForm,
      gender: [{ value: '', disabled: true }, Validators.required],
      age: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('[0-9]{0,2}')]],
      correspondenceAddress: [{ value: '', disabled: true }, Validators.required],
      presentAddress: [{ value: '', disabled: true }, Validators.required],
      permanentAddress: [{ value: '', disabled: true }, Validators.required]
    });
    this.applicationForm = this.fb.group({
      accountType: [{ value: '', disabled: true }, [Validators.required]],
      applicationNo: [{ value: '', disabled: true }],
      customer: this.customerForm,
      cardType: [{ value: '', disabled: true }, [Validators.required]],
      overeseasAccount: [{ value: '', disabled: true }, Validators.required],
      createUser: [{ value: '', disabled: true }],
      createDate: [{ value: '', disabled: true }],
      lastModifiedUser: [{ value: '', disabled: true }],
      lastModifiedDate: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }]
    });
    this.applicationForm.get('applicationNo')
    for (let item in Gender) {
      if (isNaN(Number(item))) {
        this.genders.push(item)
      }
    }
    this.service.getAllEmployeeType().subscribe(data => {
      data.forEach(da => {
        this.employeeTypes.push(da.employeeTypeName);
      });
    })
    this.service.getAllAccountType().subscribe(data => {
      console.log(data);
      data.forEach(da => {
        console.log(da)
        this.accountTypes.push(da.accountTypeName);
      });
    })
    this.service.getAllCardType().subscribe(data => {
      data.forEach(da => {
        this.cardTypes.push(da.cardTypeName);
      });

    })


      const application = this.data.application;
      console.log(application)
      application.overeseasAccount = application.overeseasAccount.toString();
      this.applicationForm.setValue(application);
      this.applicationForm.get('accountType').setValue(this.applicationForm.get('accountType').value.accountTypeName);
      this.applicationForm.get('cardType').setValue(this.applicationForm.get('cardType').value.cardTypeName)
      this.employeeForm.get('employeeType').setValue(this.employeeForm.get('employeeType').value.employeeTypeName)

      console.log();
      console.log(application.accountType);
 
  }
  get firstName() {
    return this.customerForm.get('firstName');
  }

  get middleName() {
    return this.customerForm.get('middleName');
  }

  get lastName() {
    return this.customerForm.get('lastName');
  }
  get gender() {
    return this.customerForm.get('gender');
  }
  get correspondenceAddress() {
    return this.customerForm.get('correspondenceAddress');
  }
  get presentAddress() {
    return this.customerForm.get('presentAddress');
  }
  get permanentAddress() {
    return this.customerForm.get('permanentAddress');
  }
  get designation() {
    return this.employeeForm.get('designation');
  }
  get salary() {
    return this.employeeForm.get('salary');
  }
  get age() {
    return this.customerForm.get('age');
  }
  get accountType() {
    return this.applicationForm.get('accountType');
  }
  get cardType() {
    return this.applicationForm.get('cardType');
  }
  get overeseasAccount() {
    return this.applicationForm.get('overeseasAccount')
  }

  updateUSAmount(event) {
    this.usAmount = event.target.value;
  }
  approve(){
    this.applicationForm.get("status").setValue(Status.APPROVE);
    this.dialogRef.close(this.applicationForm.value);
  }
  rework(){
    this.applicationForm.get("status").setValue(Status.REWORK);
    this.dialogRef.close(this.applicationForm.value);
  }
  reject(){
    this.applicationForm.get("status").setValue(Status.REJECT);
    this.dialogRef.close(this.applicationForm.value);
  }
  cancel(){
    this.applicationForm.get("status").setValue(Status.CANCEL);
    this.dialogRef.close(this.applicationForm.value);
  }
}
