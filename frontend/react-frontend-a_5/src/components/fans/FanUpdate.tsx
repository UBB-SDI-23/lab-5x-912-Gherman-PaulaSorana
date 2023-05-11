import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { FullSwimmer } from "../../models/FullSwimmer";
import { BACKEND_API_URL } from "../../constants";
import { toast } from "react-toastify";


export const FanUpdate = () => {

	const navigate = useNavigate();
    const { fanId } = useParams();

	const [loading, setLoading] = useState(true)
	const [fan, setFan] = useState({
        fan_first_name: "",
        fan_last_name:"",
        fan_nationality:"",
        fan_date_of_birth:"",
        fan_email:""
    });

    useEffect(() => {
		const fetchFan = async () => {
			const response = await fetch(`${BACKEND_API_URL}/fan/${fanId}/`);
			const fan = await response.json();
			setFan({
				fan_first_name: fan.fan_first_name,
                fan_last_name: fan.fan_last_name,
                fan_nationality: fan.fan_nationality,
                fan_date_of_birth: fan.fan_date_of_birth,
                fan_email: fan.fan_email
		})
			setLoading(false);
            console.log(fan);
		};
		fetchFan();
	}, [fanId]);

	const updateFan = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			const token = localStorage.getItem("token");
			if (!token) {
                toast.error("You are not logged in!");
                return;
            }
			
			await axios.put(`../../api/fan/${fanId}/`, fan, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }});
			navigate(`/fans/${fanId}`);
		} catch (error:any) {
			console.log(error.response.data.fan_email[0]);
		}
	};


	return (
		<Container>

		{loading && <CircularProgress />}

		{!loading && !fan && <div>Fan not found</div>}

		{!loading && (
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/fans/${fanId}`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updateFan}>
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

						<Button type="submit">Update Fan</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		)
}
		</Container>
	);
};