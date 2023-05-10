import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { toast, ToastContainer } from "react-toastify";

export const CoachDelete = () => {
	const { coachId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		try{
			event.preventDefault();
			const token = localStorage.getItem("token");
			if (!token) {
                toast.error("You are not logged in!");
                return;
            }
			await axios.delete(`${BACKEND_API_URL}/coach/${coachId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }});
		}
		catch (error: any){
			if (error.response.status === 401 || error.response.status === 403) {
                toast.error("You are not authorized to delete this coach!");
            }
            return;
		}
		
		navigate("/coaches");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	
		navigate("/coaches");
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this coach? This cannot be undone!
				</CardContent>
				<CardActions>
					<Button onClick={handleDelete}>Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
			<ToastContainer />
		</Container>
	);
};