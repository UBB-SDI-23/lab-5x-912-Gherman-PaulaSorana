import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


export const SwimmerFanAdd = () => {

const navigate = useNavigate();

	const [swimmer, setSwimmer] = useState({
		swimmer:1,
        fan:1,
        fan_page_name:"",
        fan_since_year:1
	});

	const addSwimmer = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/swimmerFan/`, swimmer);
			navigate("/swimmerfans");
		} catch (error) {
			console.log(error);
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

						<Button type="submit">Add Swimmer Fan</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};