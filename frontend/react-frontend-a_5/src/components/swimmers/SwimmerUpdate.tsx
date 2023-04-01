import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { FullSwimmer } from "../../models/FullSwimmer";


export const SwimmerUpdate = () => {

const navigate = useNavigate();

    const { swimmerId } = useParams();
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
			const response = await fetch(`../api/swimmer/${swimmerId}/`);
			const swimmer = await response.json();
			setSwimmer(swimmer);
            console.log(swimmer);
		};
		fetchSwimmer();
	}, [swimmerId]);

	const updateSwimmer = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.put(`../../api/swimmer/${swimmerId}/`, swimmer);
			navigate(`/swimmers/${swimmerId}/`);
		} catch (error) {
			console.log(error);
		}
	};

    while(swimmer === undefined)
    {}

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/${swimmerId}`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updateSwimmer}>
						<TextField value={swimmer.swimmer_last_name}
							id="swimmer_last_name"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_last_name: event.target.value })}
						/>
						<TextField value={swimmer.swimmer_first_name}
							id="swimmer_first_name"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_first_name: event.target.value })}
						/>

                        <TextField value={swimmer.swimmer_county}
							id="swimmer_county"
							label="County"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_county: event.target.value })}
						/>

                        <TextField value={swimmer.swimmer_date_of_birth}
							id="swimmer_date_of_birth" 
							label="Date of birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_date_of_birth: event.target.value })}
						/>

                        <TextField value={swimmer.swimmer_years_of_experience}
							id="swimmer_years_of_experience"
							label="Years of experience"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, swimmer_years_of_experience: Number(event.target.value) })}
						/>

                        <TextField value={swimmer.team}
							id="team"
							label="Team"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setSwimmer({ ...swimmer, team: Number(event.target.value) })}
						/>

						<Button type="submit">Update Swimmer</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};