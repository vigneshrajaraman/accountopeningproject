import { Role } from './role';

export interface Token{
    token:string;
    authority:Role[]
}