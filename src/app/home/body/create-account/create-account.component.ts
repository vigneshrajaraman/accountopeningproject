import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  applicationForm;
  customerForm;
  employeeForm;
  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      applicationNo: [""],
      customer: this.customerForm,
      accountType: ["", [Validators.required]],
      cadeType: ["", [Validators.required]],
      overeseasAccount: [""],
      createUser: [{ value: '', disabled: true }],
      createDate: [{ value: '', disabled: true }],
      lastModifiedUser: [{ value: '', disabled: true }],
      lastModifiedDate: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }]
    });
    this.customerForm = this.fb.group({
      customerId: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      employee: this.employeeForm,
      gender: [''],
      age: ['', [Validators.required, Validators.pattern('[0-9]')]],
      correspondenceAddress: [''],
      presentAddress: [''],
      permanentAddress: ['']
    });
    this.employeeForm = this.fb.group({
      employeeId: [''],
      firstName: [''],
      designation: [''],
      employeeType: [''],
      salary: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });

  }


}
