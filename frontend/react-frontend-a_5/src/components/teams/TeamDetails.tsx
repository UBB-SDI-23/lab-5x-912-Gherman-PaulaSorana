import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BACKEND_API_URL } from "../../constants";
import { Team } from "../../models/Team";


export const TeamDetails = () => {

    const { teamId } = useParams();
	const [team, setTeam] = useState<Team>();

    useEffect(() => {
		const fetchTeam = async () => {
			const response = await fetch(`${BACKEND_API_URL}/team/${teamId}/`);
			const team = await response.json();
			setTeam(team);
            console.log(team);
		};
		fetchTeam();
	}, [teamId]);

    return (
		<Container>
			<Card style={{backgroundColor:"whitesmoke"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teams`}>
						<ArrowBackIcon />
					</IconButton>{" "} 
					<h1 style={{textAlign:"left", fontWeight:'bold'}}>Team Details</h1>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Name: {team?.team_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Founding year: {team?.team_founding_year}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Budget: {team?.team_budget}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Motto: {team?.team_motto}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Abbreviation: {team?.team_abbreviation}</p>
				</CardContent>

                <CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teams/${teamId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/teams/${teamId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>

			</Card>
		</Container>
	);
};