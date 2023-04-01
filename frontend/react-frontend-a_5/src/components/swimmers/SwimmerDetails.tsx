import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FullSwimmer } from "../../models/FullSwimmer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export const SwimmerDetails = () => {

    const { swimmerId } = useParams();
	const [swimmer, setSwimmer] = useState<FullSwimmer>();

    useEffect(() => {
		const fetchSwimmer = async () => {
			const response = await fetch(`../api/swimmer/${swimmerId}/`);
			const swimmer = await response.json();
			setSwimmer(swimmer);
            console.log(swimmer);
		};
		fetchSwimmer();
	}, [swimmerId]);

    return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Swimmer Details</h1>
					<p>Swimmer Last Name: {swimmer?.swimmer_last_name}</p>
					<p>Swimmer First Name: {swimmer?.swimmer_first_name}</p>
					<p>Swimmer County: {swimmer?.swimmer_county}</p>
                    <p>Swimmer Date of Birth: {swimmer?.swimmer_date_of_birth}</p>
                    <p>Swimmer Years Of Experience: {swimmer?.swimmer_years_of_experience}</p>
                    <p>Swimmer Team: {swimmer?.team.team_name}</p>
                    <p>Swimmer Fans</p>
                    <ul>
                        {swimmer?.fans?.map((fan) => (
                            <li key={fan.id}>{fan.fan_last_name} {fan.fan_first_name}</li>
                        ))}
                    </ul>
				</CardContent>

                <CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${swimmerId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${swimmerId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>

			</Card>
		</Container>
	);
};