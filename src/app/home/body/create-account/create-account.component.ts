import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Gender } from 'src/app/model/gender';
import { Status } from 'src/app/model/status';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { AppServiceService } from '../service/app-service.service';
import { EmployeeType } from 'src/app/model/employeeType';
import { AccountType } from 'src/app/model/accountType';
import { CardType } from 'src/app/model/cardType';
import { Application } from 'src/app/model/application';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: AppServiceService) { }
  applicationForm;
  customerForm;
  employeeForm;
  errrorflagCustomer;
  genders: string[] = new Array();
  employeeTypes: EmployeeType[];
  accountTypes: AccountType[];
  cardTypes: CardType[];
  enableSpinner;
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
      this.employeeTypes = data;
    })
    this.service.getAllAccountType().subscribe(data => {
      this.accountTypes = data;
    })
    this.service.getAllCardType().subscribe(data => {
      this.cardTypes = data;
    })
    console.log(this.genders)
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
      this.enableSpinner = true;
      this.applicationForm.get("createUser").setValue(localStorage.getItem('username'));
      this.applicationForm.get('createDate').setValue(new Date());
      this.service.insertApplication(this.applicationForm.value).subscribe(data => {
        this.enableSpinner = false;
        console.log(data)
        this.application = data;
      });

    }
    console.log(this.errorFlagApplication);
  }
}
