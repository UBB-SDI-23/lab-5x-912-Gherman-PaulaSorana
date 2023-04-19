import { Fan } from "./Fan";
import { Swimmer } from "./Swimmer";

export interface SwimmerFan{
    id:number;
    swimmer:Swimmer;
    fan:Fan;
    fan_page_name:string;
    fan_since_year:string;
};