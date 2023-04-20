import { Swimmer } from "./Swimmer";

export interface Fan{
    id:number;
    fan_first_name:string;
    fan_last_name:string;
    fan_nationality:string;
    fan_date_of_birth:string;
    fan_email:string;
    swimmers: number[];
};