import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swimmer } from "../../models/Swimmer";




export const SwimmerDetails = () => {

    const { swimmerId } = useParams();
	const [swimmer, setSwimmer] = useState<Swimmer>();

    useEffect(() => {
		const fetchCourse = async () => {
			const response = await fetch(`api/swimmer/${swimmerId}/`);
			const swimmer = await response.json();
			setSwimmer(swimmer);
		};
		fetchCourse();
	}, [swimmerId]);


    return (
		<Container>
			<Card>
				<CardContent>
					{/* <IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers`}>
						<ArrowBackIcon />
					</IconButton>{" "} */}
					<h1>Swimmer Details</h1>
					<p>Swimmer Last Name: {swimmer?.swimmer_last_name}</p>
					<p>Swimmer First Name: {swimmer?.swimmer_first_name}</p>
					<p>Swimmer County: {swimmer?.swimmer_county}</p>
                    <p>Swimmer Year Of Experience: {swimmer?.swimmer_years_of_experience}</p>
                
				</CardContent>
			</Card>
		</Container>
	);
};