import { Team } from "./Team";

export{};

export interface Coach{
    id:number;
    coach_first_name:string;
    coach_last_name:string;
    coach_years_of_experience:string;
    coach_date_of_birth:string;
    coach_email:string;
    team: Team;
};