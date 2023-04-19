import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


export const CoachAdd = () => {

const navigate = useNavigate();

	const [coach, setCoach] = useState({
		coach_first_name:"",
        coach_last_name:"",
        coach_years_of_experience:1,
        coach_date_of_birth:"",
        coach_email:"",
        team: 1,
	});

	const addCoach = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/coach/`, coach);
			navigate("/coaches");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addCoach}>
						<TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="coach_first_name"
							label="First name"
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

						<Button type="submit">Add Coach</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};