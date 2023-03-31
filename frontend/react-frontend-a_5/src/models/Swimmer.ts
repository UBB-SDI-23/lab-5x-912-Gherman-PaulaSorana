import Team from "./Team";

export interface Swimmer{
    id:number;
    swimmer_last_name:string;
    swimmer_first_name:string;
    swimmer_county:string;
    swimmer_date_of_birth:string;
    swimmer_years_of_experience:number;
    team: Team;
    fans:

}