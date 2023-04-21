import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BACKEND_API_URL } from "../../constants";
import { Fan } from "../../models/Fan";
import { FullFan } from "../../models/FullFan";


export const FanDetails = () => {

    const { fanId } = useParams();
	const [fan, setFan] = useState<FullFan>();

    useEffect(() => {
		const fetchFan = async () => {
			const response = await fetch(`${BACKEND_API_URL}/fan/${fanId}/`);
			const fan = await response.json();
			setFan(fan);
            console.log(fan);
		};
		fetchFan();
	}, [fanId]);

    return (
		<Container>
			<Card style={{backgroundColor:"whitesmoke"}}>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/fans`}>
						<ArrowBackIcon />
					</IconButton>{" "} 
					<h1 style={{textAlign:"left", fontWeight:'bold'}}>Fan Details</h1>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>First Name: {fan?.fan_first_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Last Name: {fan?.fan_last_name}</p>
					<p  style={{textAlign:"left", fontWeight:'bold'}}>Nationality: {fan?.fan_nationality}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Date of Birth: {fan?.fan_date_of_birth}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Email: {fan?.fan_email}</p>
                    <p  style={{textAlign:"left", fontWeight:'bold'}}>Swimmers</p>
                    <ul style={{textAlign:"left", fontWeight:'bold'}}>
                        {fan?.swimmers?.map((swimmer) => (
                            <li key={swimmer.id}>{swimmer.swimmer_last_name} {swimmer.swimmer_first_name}</li>
                        ))}
                    </ul>
				</CardContent>

                <CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/fans/${fanId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/fans/${fanId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>

			</Card>
		</Container>
	);
};