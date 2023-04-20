import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BACKEND_API_URL } from "../../constants";
import { Coach } from "../../models/Coach";


export const CoachDetails = () => {

    const { coachId } = useParams();
	const [coach, setCoach] = useState<Coach>();

    useEffect(() => {
		const fetchCoach = async () => {
			const response = await fetch(`${BACKEND_API_URL}/coach/${coachId}/`);
			const coach = await response.json();
			setCoach(coach);
            console.log(coach);
		};
		fetchCoach();
	}, [coachId]);

    return (
		<Container>
			<Card style={{backgroundColor:"whitesmoke"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches`}>
						<ArrowBackIcon />
					</IconButton>{" "} 
					<h1 style={{textAlign:"left", fontWeight:'bold'}}>Coach Details</h1>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>First Name: {coach?.coach_first_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Last Name: {coach?.coach_last_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Years Of Experience: {coach?.coach_years_of_experience}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Date of Birth: {coach?.coach_date_of_birth}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Email: {coach?.coach_email}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Team: {coach?.team.team_name}</p>
				</CardContent>

                <CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coachId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coachId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>

			</Card>
		</Container>
	);
};