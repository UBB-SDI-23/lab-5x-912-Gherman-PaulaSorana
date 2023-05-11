import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TeamUpdate = () => {

	const navigate = useNavigate();
    const { teamId } = useParams();

	const [loading, setLoading] = useState(true)
	const [team, setTeam] = useState({
        team_name:"",
        team_founding_year:1,
        team_budget:1,
        team_motto:"",
        team_abbreviation:""
        // team_description:""
    });

    useEffect(() => {
		const fetchTeam= async () => {
			const response = await fetch(`${BACKEND_API_URL}/team/${teamId}/`);
			const team = await response.json();
			setTeam({
				team_name: team.team_name,
                team_founding_year: team.team_founding_year,
                team_budget: team.team_budget,
                team_motto: team.team_motto,
                team_abbreviation: team.team_abbreviation,
                // team_description: team.team_description
		})
			setLoading(false);
            console.log(team);
		};
		fetchTeam();
	}, [teamId]);

	const updateTeam = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			if(team.team_founding_year > 2023 || team.team_founding_year < 1950 ||
				team.team_founding_year.toString().length > 4)
			{
				throw new Error("Not a valid year!");
			}

			const token = localStorage.getItem("token");
			if (!token) {
                toast.error("You are not logged in!");
                return;
            }

			const response = await axios.put(`../../api/team/${teamId}/`, team,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                }});
			if (response.status < 200 || response.status >= 300)
			{
				throw new Error("Error when adding!");
			}
			else{
				navigate(`/teams/${teamId}`);
			}
			
		} catch (error:any) {
			toast.error(error.response.data.team_name[0]);
			console.log(error);
		}
	};


	return (
		<Container>

		{loading && <CircularProgress />}

		{!loading && !team && <div>Team not found</div>}

		{!loading && (
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teams/${teamId}`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updateTeam}>
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

						<Button type="submit">Update Team</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		)
}
		</Container>
	);
};