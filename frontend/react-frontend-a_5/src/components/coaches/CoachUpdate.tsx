import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


export const CoachUpdate = () => {

	const navigate = useNavigate();
    const { coachId } = useParams();

	const [loading, setLoading] = useState(true)
	const [coach, setCoach] = useState({
        coach_first_name:"",
        coach_last_name:"",
        coach_years_of_experience:1,
        coach_date_of_birth:"",
        coach_email:"",
        team: 1,
    });

    useEffect(() => {
		const fetchCoach = async () => {
			const response = await fetch(`${BACKEND_API_URL}/coach/${coachId}/`);
			const coach = await response.json();
			setCoach({
				coach_first_name: coach.coach_first_name,
                coach_last_name: coach.coach_last_name,
                coach_years_of_experience: coach.coach_years_of_experience,
                coach_date_of_birth: coach.coach_date_of_birth,
                coach_email: coach.coach_email,
                team: coach.team.id,
		})
			setLoading(false);
            console.log(coach);
		};
		fetchCoach();
	}, [coachId]);

	const updateCoach = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.put(`../../api/coach/${coachId}/`, coach);
			navigate(`/coaches/${coachId}`);
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<Container>

		{loading && <CircularProgress />}

		{!loading && !coach && <div>Coach not found</div>}

		{!loading && (
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coachId}`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updateCoach}>
                    <TextField
						id="coach_first_name"
						label={`First name (${coach.coach_first_name})`}
						variant="outlined"
						fullWidth
						sx={{ mb: 2 }}
						onChange={(event) => setCoach({ ...coach, coach_first_name: event.target.value })}
					/>

						<TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="coach_last_name"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, coach_last_name: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="coach_years_of_experience"
							label="Years of experience"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, coach_years_of_experience: Number(event.target.value) })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="coach_date_of_birth"
							label="Date of birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, coach_date_of_birth: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="coach_email"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, coach_email: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="team"
							label="Team"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, team: Number(event.target.value) })}
						/>

						<Button type="submit">Update Coach</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		)
}
		</Container>
	);
};