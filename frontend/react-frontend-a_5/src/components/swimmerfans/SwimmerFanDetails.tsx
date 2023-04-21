import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FullSwimmer } from "../../models/FullSwimmer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BACKEND_API_URL } from "../../constants";
import { SwimmerFan } from "../../models/SwimmerFan";
import { FullSwimmerFan } from "../../models/FullSwimmerFan";


export const SwimmerFanDetails = () => {

    const { swimmerfanId } = useParams();
	const [swimmer, setSwimmer] = useState<SwimmerFan>();

    useEffect(() => {
		const fetchSwimmer = async () => {
			const response = await fetch(`${BACKEND_API_URL}/swimmerFan/${swimmerfanId}/`);
			const swimmer = await response.json();
			setSwimmer(swimmer);
            console.log(swimmer);
		};
		fetchSwimmer();
	}, [swimmerfanId]);

    return (
		<Container>
			<Card style={{backgroundColor:"whitesmoke"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmerfans`}>
						<ArrowBackIcon />
					</IconButton>{" "} 
					<h1 style={{textAlign:"left", fontWeight:'bold'}}>SwimmerFan Details</h1>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Fan Page Name: {swimmer?.fan_page_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Fan Since Year: {swimmer?.fan_since_year}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Swimmer: {swimmer?.swimmer}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Fan: {swimmer?.fan}</p>
				</CardContent>


                <CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmerfans/${swimmerfanId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>

			</Card>
		</Container>
	);
};