import { Employee } from './employee';
import { Gender } from './gender';

export class Customer{
    customerId:string;
	firstName:string;
	middleName:string;
	lastName:string;
	employee:Employee;
	gender:Gender;
	age:number;
	correspondenceAddress:string;
	presentAddress:string;
	permanentAddress:string;
}