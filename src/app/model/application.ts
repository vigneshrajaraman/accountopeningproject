import { Customer } from './customer';
import { AccountType } from './accountType';
import { CardType } from './cardType';
import { Status } from './status';

export class Application{
    applicationNo:string;
    customer:Customer;
    accountType:AccountType;
    cadeType:CardType;
	overeseasAccount:boolean;
	createUser:string;
	createDate:Date;
	lastModifiedUser:string;
	lastModifiedDate:Date;
	status:Status;
}