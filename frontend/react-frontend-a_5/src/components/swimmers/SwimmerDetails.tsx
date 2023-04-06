import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FullSwimmer } from "../../models/FullSwimmer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BACKEND_API_URL } from "../../constants";


export const SwimmerDetails = () => {

    const { swimmerId } = useParams();
	const [swimmer, setSwimmer] = useState<FullSwimmer>();

    useEffect(() => {
		const fetchSwimmer = async () => {
			const response = await fetch(`${BACKEND_API_URL}/swimmer/${swimmerId}/`);
			const swimmer = await response.json();
			setSwimmer(swimmer);
            console.log(swimmer);
		};
		fetchSwimmer();
	}, [swimmerId]);

    return (
		<Container>
			<Card style={{backgroundColor:"whitesmoke"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers`}>
						<ArrowBackIcon />
					</IconButton>{" "} 
					<h1 style={{textAlign:"left", fontWeight:'bold'}}>Swimmer Details</h1>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Last Name: {swimmer?.swimmer_last_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>First Name: {swimmer?.swimmer_first_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>County: {swimmer?.swimmer_county}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Date of Birth: {swimmer?.swimmer_date_of_birth}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Years Of Experience: {swimmer?.swimmer_years_of_experience}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Team: {swimmer?.team.team_name}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Fans</p>
                    <ul style={{textAlign:"left", fontWeight:'bold'}}>
                        {swimmer?.fans?.map((fan) => (
                            <li key={fan.id}>{fan.fan_last_name} {fan.fan_first_name}</li>
                        ))}
                    </ul>
				</CardContent>

                <CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/${swimmerId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/${swimmerId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>

			</Card>
		</Container>
	);
};