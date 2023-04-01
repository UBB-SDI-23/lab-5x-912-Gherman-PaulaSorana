import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";


export const SwimmerAdd = () => {

const navigate = useNavigate();

	const [swimmer, setSwimmer] = useState({
		swimmer_last_name:"",
        swimmer_first_name:"",
        swimmer_county:"",
        swimmer_date_of_birth:"",
        swimmer_years_of_experience:1,
        team: 1,
	});

	const addSwimmer = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post("../api/swimmer/", swimmer);
			navigate("/swimmers");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addSwimmer}>
						<TextField
							id="swimmer_last_name"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_last_name: event.target.value })}
						/>
						<TextField
							id="swimmer_first_name"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_first_name: event.target.value })}
						/>

                        <TextField
							id="swimmer_county"
							label="County"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_county: event.target.value })}
						/>

                        <TextField
							id="swimmer_date_of_birth"
							label="Date of birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_date_of_birth: event.target.value })}
						/>

                        <TextField
							id="swimmer_years_of_experience"
							label="Years of experience"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_years_of_experience: Number(event.target.value) })}
						/>

                        <TextField
							id="team"
							label="Team"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, team: Number(event.target.value) })}
						/>

						<Button type="submit">Add Swimmer</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};