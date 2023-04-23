import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
			const resp = await axios.get(`${BACKEND_API_URL}/fan/`);
			let ok = true;
			for (let i=0; i<resp.data.length && ok; i++)
				{
					if(fan.fan_email === resp.data[i].fan_email)
					{
						ok = false;
						throw new Error("This email is already in use!");
					}
				}


			const response = await axios.post(`${BACKEND_API_URL}/fan/`, fan);
			
			if (response.status < 200 || response.status >= 300) {
				throw new Error("This email is already in use!");
			}
			else{
				navigate("/fans");
			}
		
		}
		catch (error: any) {
			if(error.response.data.detail === "This email address is already in use.")
				{toast.error((error as { message: string }).message);
				console.log(error);}
			
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
						<ToastContainer />
						<Button type="submit">Add Fan</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};