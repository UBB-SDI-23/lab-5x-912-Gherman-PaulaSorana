import {Team} from "./Team";
import { Fan } from "./Fan";
import { User } from "./User";

export interface Swimmer{
    id:number;
    swimmer_last_name:string;
    swimmer_first_name:string;
    swimmer_county:string;
    swimmer_date_of_birth:string;
    swimmer_years_of_experience:number;
    team: number;
    fans: number[];
    added_by:User;
};