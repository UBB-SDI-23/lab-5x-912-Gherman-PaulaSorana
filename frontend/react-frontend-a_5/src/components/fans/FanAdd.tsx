import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


export const FanAdd = () => {

const navigate = useNavigate();

	const [fan, setFan] = useState({
		fan_first_name:"",
        fan_last_name:"",
        fan_nationality:"",
        fan_date_of_birth:"",
        fan_email:""
	});

	const addFan = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/fan/`, fan);
			navigate("/fans");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/fans`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addFan}>
						<TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan_first_name"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFan({ ...fan, fan_first_name: event.target.value })}
						/>
						<TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan_last_name"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFan({ ...fan, fan_last_name: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan_nationality"
							label="Nationality"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFan({ ...fan, fan_nationality: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan_date_of_birth"
							label="Date of birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFan({ ...fan, fan_date_of_birth: event.target.value })}
						/>

                        <TextField style={{color:"#2471A3", fontWeight:'bold'}}
							id="fan_email"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFan({ ...fan, fan_email: event.target.value })}
						/>

						<Button type="submit">Add Fan</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};