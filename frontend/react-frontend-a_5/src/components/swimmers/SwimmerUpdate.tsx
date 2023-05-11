import { Autocomplete, Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { FullSwimmer } from "../../models/FullSwimmer";
import { BACKEND_API_URL } from "../../constants";
import { Team } from "../../models/Team";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SwimmerUpdate = () => {

	const navigate = useNavigate();
    const { swimmerId } = useParams();

	const [loading, setLoading] = useState(true)
	const [swimmer, setSwimmer] = useState({
        swimmer_last_name:"",
        swimmer_first_name:"",
        swimmer_county:"",
        swimmer_date_of_birth:"",
        swimmer_years_of_experience:1,
        team: 1
    });

    useEffect(() => {
		const fetchSwimmer = async () => {
			const response = await fetch(`${BACKEND_API_URL}/swimmer/${swimmerId}/`);
			const swimmer = await response.json();
			setSwimmer({
				swimmer_last_name: swimmer.swimmer_last_name,
				swimmer_first_name: swimmer.swimmer_first_name,
				swimmer_county: swimmer.swimmer_county,
				swimmer_date_of_birth: swimmer.swimmer_date_of_birth,
				swimmer_years_of_experience: swimmer.swimmer_years_of_experience,
				team: swimmer.team.id
		})
			setLoading(false);
            console.log(swimmer);
		};
		fetchSwimmer();
	}, [swimmerId]);

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

	const updateSwimmer = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			if (swimmer.swimmer_years_of_experience <= 0)
			{
				throw new Error("Years of experience must be greater than zero!");
			}

			const token = localStorage.getItem("token");
			if (!token) {
                toast.error("You are not logged in!");
                return;
            }

			const response = await axios.put(`${BACKEND_API_URL}/swimmer/${swimmerId}/`, swimmer,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                }});

			if (response.status < 200 || response.status >= 300) {
				throw new Error("An error occurred while adding the item!");
			  } else {
				navigate(`/swimmers/${swimmerId}`);
			  }
			
		} catch (error) {
			console.log(error);
			toast.error((error as { message: string }).message);
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

		{!loading && !swimmer && <div>Swimmer not found</div>}

		{!loading && (
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/${swimmerId}`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updateSwimmer}>
						<TextField value={swimmer.swimmer_last_name} style={{color:"#2471A3", fontWeight:'bold'}}
							id="swimmer_last_name"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_last_name: event.target.value })}
						/>
						<TextField value={swimmer.swimmer_first_name} style={{color:"#2471A3", fontWeight:'bold'}}
							id="swimmer_first_name"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_first_name: event.target.value })}
						/>

                        <TextField value={swimmer.swimmer_county} style={{color:"#2471A3", fontWeight:'bold'}}
							id="swimmer_county"
							label="County"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_county: event.target.value })}
						/>

                        <TextField value={swimmer.swimmer_date_of_birth} style={{color:"#2471A3", fontWeight:'bold'}}
							id="swimmer_date_of_birth" 
							label="Date of birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_date_of_birth: event.target.value })}
						/>

                        <TextField value={swimmer.swimmer_years_of_experience} style={{color:"#2471A3", fontWeight:'bold'}}
							id="swimmer_years_of_experience"
							label="Years of experience"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_years_of_experience: Number(event.target.value) })}
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
									setSwimmer({ ...swimmer, team: value.id });
								}
							}}
							
						/>

						<ToastContainer />

						<Button type="submit">Update Swimmer</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		)
}
		</Container>
	);
};