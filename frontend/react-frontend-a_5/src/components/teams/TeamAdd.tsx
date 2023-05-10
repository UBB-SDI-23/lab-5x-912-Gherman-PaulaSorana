import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TeamAdd = () => {

const navigate = useNavigate();

	const [team, setTeam] = useState({
		team_name:"",
        team_founding_year:1,
        team_budget:1,
        team_motto:"",
        team_abbreviation:"",
		added_by:1
	});

	const addTeam = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {

			if(team.team_founding_year > 2023 || team.team_founding_year < 1950 ||
				team.team_founding_year.toString().length > 4)
			{
				throw new Error("Not a valid year!");
			}

			const id = localStorage.getItem('user_id');
			if(id){
				team.added_by = parseInt(id);
			}

			const token = localStorage.getItem("token");
			if (!token) {
                toast.error("You are not logged in!");
                return;
            }

			const response = await axios.post(`${BACKEND_API_URL}/team/`, team, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
			
			if (response.status < 200 || response.status >= 300)
			{
				throw new Error("This team name is already in use!");
			}
			else{
				navigate("/teams");
			}

		} catch (error:any) {
			toast.error(error.response.data.team_name[0]);
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

						<ToastContainer />
						<Button type="submit">Add Team</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};