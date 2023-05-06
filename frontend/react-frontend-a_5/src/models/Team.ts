import { User } from "./User";

export{};

export interface Team{
    id:number;
    team_name:string;
    team_founding_year:number;
    team_budget:number;
    team_motto:string;
    team_abbreviation:string;
    no_swim:number;
    added_by:User;
};