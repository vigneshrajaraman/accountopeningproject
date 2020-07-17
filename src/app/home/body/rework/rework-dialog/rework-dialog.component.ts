import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Application } from 'src/app/model/application';
import { CardType } from 'src/app/model/cardType';
import { AccountType } from 'src/app/model/accountType';
import { EmployeeType } from 'src/app/model/employeeType';
import { AppServiceService } from '../../service/app-service.service';
import { Gender } from 'src/app/model/gender';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerfierDialogComponent } from '../../verfier/verfier-dialog/verfier-dialog.component';

@Component({
  selector: 'app-rework-dialog',
  templateUrl: './rework-dialog.component.html',
  styleUrls: ['./rework-dialog.component.css']
})
export class ReworkDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<VerfierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: AppServiceService) { }
    
  applicationForm;
  customerForm;
  employeeForm;
  errrorflagCustomer;
  genders: string[] = new Array();
  employeeTypes: string[]= new Array();
  accountTypes: string[]= new Array();
  cardTypes: string[]= new Array();
  application: Application;
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      firstName: [{ value: '', disabled: true }],
      designation: ['', Validators.required],
      employeeType: [''],
      salary: ['', [Validators.required]]
    });

    this.customerForm = this.fb.group({
      customerId: [''],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: [''],
      employee: this.employeeForm,
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('[0-9]{0,2}')]],
      correspondenceAddress: ['', Validators.required],
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required]
    });

    this.applicationForm = this.fb.group({
      applicationNo: [""],
      customer: this.customerForm,
      accountType: ["", [Validators.required]],
      cardType: ["", [Validators.required]],
      overeseasAccount: ["", Validators.required],
      createUser: [{ value: '', disabled: true }],
      createDate: [{ value: '', disabled: true }],
      lastModifiedUser: [{ value: '', disabled: true }],
      lastModifiedDate: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }]
    });


    for (let item in Gender) {
      
      if (isNaN(Number(item))) {
        this.genders.push(item)
      }
    }
    this.service.getAllEmployeeType().subscribe(data => {
      data.forEach(da=>{
        this.employeeTypes.push(da.employeeTypeName);
      })
    })
    this.service.getAllAccountType().subscribe(data => {
      data.forEach(da=>{
        this.accountTypes.push(da.accountTypeName);
      })
    })
    this.service.getAllCardType().subscribe(data => {
      data.forEach(da=>{
        this.cardTypes.push(da.cardTypeName);
      })
    })
    console.log(this.genders)
    
    const application = this.data.application;
    application.overeseasAccount = application.overeseasAccount.toString();
    this.applicationForm.setValue(application);
    this.applicationForm.get('accountType').setValue(this.applicationForm.get('accountType').value.accountTypeName);
    this.applicationForm.get('cardType').setValue(this.applicationForm.get('cardType').value.cardTypeName)
    this.employeeForm.get('employeeType').setValue(this.employeeForm.get('employeeType').value.employeeTypeName)
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
  onSubmit() {
    console.log("onsubmit")
    console.log(this.customerForm.valid);
    this.employeeForm.get("firstName").setValue(this.customerForm.get("firstName").value)
    if (!this.customerForm.valid) {
      this.errrorflagCustomer = true;
    } else {
      this.errrorflagCustomer = false;
    }
    console.log(this.customerForm.value)
  }
  usAmount = 0;
  errorFlagEmployee;
  updateUSAmount(event) {
    this.usAmount = event.target.value;
  }
  onEmployeeSubmit() {
    console.log(this.customerForm.valid);
    if (!this.employeeForm.valid) {
      this.errorFlagEmployee = true;
    } else {
      this.errorFlagEmployee = false;
      console.log(this.customerForm.value)

    }
  }
  errorFlagApplication;

  onApplicationSubmit() {
    console.log("applicationForm", this.applicationForm.valid)
    console.log(this.applicationForm.value);

    if (!this.applicationForm.valid) {
      this.errorFlagApplication = true;
    } else {
      this.errorFlagApplication = false;
      console.log(this.applicationForm.value)
      this.applicationForm.get("createUser").setValue(localStorage.getItem('username'));
      this.applicationForm.get('createDate').setValue(new Date());
      this.dialogRef.close(this.applicationForm.value);
    }
    console.log(this.errorFlagApplication);
  }
}
