import { Autocomplete, Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Team } from "../../models/Team";
import { debounce } from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

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

	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

	const [teams, setTeams] = useState<Team[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			let url = `${BACKEND_API_URL}/teamOrdName/${query}/?page=${page}&page_size=${pageSize}`;
			const response = await fetch(url);
			const { count, next, previous, results } = await response.json();
			setTeams(results);
			console.log(results);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);


	const updateCoach = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			if(coach.coach_years_of_experience < 0)
			{
				throw new Error("Years of experience must be greater than zero!");
			}
			const token = localStorage.getItem("token");
			if (!token) {
                toast.error("You are not logged in!");
                return;
            }
			const response = await axios.put(`../../api/coach/${coachId}/`, coach, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }});
			if (response.status < 200 || response.status >= 300) {
				throw new Error("An error occurred while adding the item!");
			  } else {
				navigate(`/coaches/${coachId}`);
			  }
			
		} catch (error) {
			toast.error((error as { message: string }).message);
			console.log(error);
		}
	};

	const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
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

						<Autocomplete
							id="team"
							options={teams}
							renderInput={(params) => <TextField {...params} label="Team" variant="outlined" />}
							getOptionLabel={(option) => `${option.team_name} - ${option.team_abbreviation}`}
							filterOptions={(options, state) => options.filter((option) => option.team_name.toLowerCase().includes(state.inputValue.toLowerCase()))}

							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setCoach({ ...coach, team: value.id });
								}
							}}
							
						/>

						<ToastContainer />

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