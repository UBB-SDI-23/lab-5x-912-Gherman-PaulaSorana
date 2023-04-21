import { Swimmer } from "./Swimmer";

export {};

export interface TeamOrdNoSwim{
    id:number;
    team_name:string;
    team_founding_year:number;
    team_budget:number;
    team_motto:string;
    team_abbreviation:string;
    swimmers: Swimmer[];
    no_of_swimmers:number;
};