import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Fan } from "../../models/Fan";
import { debounce } from "lodash";


export const SwimmerFanAdd = () => {

const navigate = useNavigate();

	const [swimmer, setSwimmer] = useState({
		swimmer:1,
        fan:1,
        fan_page_name:"",
        fan_since_year:1
	});

	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

	const [swimmers, setTSwimmers] = useState<Swimmer[]>([]);
	const [fan, setTFans] = useState<Fan[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			let url = `${BACKEND_API_URL}/swimmerOrdName/${query}/?page=${page}&page_size=${pageSize}`;
			const response = await fetch(url);
			const { count, next, previous, results } = await response.json();
			setSwimmer(results);
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

	const addSwimmer = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/swimmerFan/`, swimmer);
			navigate("/swimmerfans");
		} catch (error) {
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
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmerfans`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addSwimmer}>
                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="swimmer"
							label="Swimmer"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer: Number(event.target.value) })}
						/>
						<TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan"
							label="fan"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, fan: Number(event.target.value) })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan_page_name"
							label="fan page name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, fan_page_name: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan_since_year"
							label="Fan since year"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, fan_since_year: Number(event.target.value) })}
						/>

						<Autocomplete
							id="swimmer"
							options={swimmers}
							renderInput={(params) => <TextField {...params} label="Swimmers" variant="outlined" />}
							getOptionLabel={(option) => `${option.swimmer_first_name} - ${option.swimmer_last_name}`}
							filterOptions={(options, state) => options.filter((option) => option.swimmer_first_name.toLowerCase().includes(state.inputValue.toLowerCase()))}

							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setSwimmer({ ...swimmer, swimmer: value.id });
								}
							}}
							
						/>

						<Button type="submit">Add Swimmer Fan</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};