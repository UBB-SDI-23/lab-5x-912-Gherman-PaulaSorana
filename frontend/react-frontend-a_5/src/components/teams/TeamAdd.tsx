import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


export const TeamAdd = () => {

const navigate = useNavigate();

	const [team, setTeam] = useState({
		team_name:"",
        team_founding_year:1,
        team_budget:1,
        team_motto:"",
        team_abbreviation:"",
        team_description:""
	});

	const addTeam = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/team/`, team);
			navigate("/teams");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teams`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addTeam}>
						<TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="team_name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeam({ ...team, team_name: event.target.value })}
						/>
						<TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="team_founding_year"
							label="Founding year"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeam({ ...team, team_founding_year: Number(event.target.value) })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="team_budget"
							label="Budget"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeam({ ...team, team_budget: Number(event.target.value) })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="team_motto"
							label="Motto"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeam({ ...team, team_motto: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="team_abbreviation"
							label="Abbreviation"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTeam({ ...team, team_abbreviation: event.target.value })}
						/>

						<Button type="submit">Add Team</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};