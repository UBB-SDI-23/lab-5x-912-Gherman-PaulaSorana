import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const SwimmerDelete = () => {
	const { swimmerId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`../../api/swimmer/${swimmerId}/`);
		
		navigate("/swimmers");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	
		navigate("/swimmers");
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this swimmer? This cannot be undone!
				</CardContent>
				<CardActions>
					<Button onClick={handleDelete}>Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
};