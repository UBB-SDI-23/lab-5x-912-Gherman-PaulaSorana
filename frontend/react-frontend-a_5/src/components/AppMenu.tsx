import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PoolIcon from '@mui/icons-material/Pool';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GroupsIcon from '@mui/icons-material/Groups';
import Face2Icon from '@mui/icons-material/Face2';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SportsIcon from '@mui/icons-material/Sports';
import InsightsIcon from '@mui/icons-material/Insights';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { useEffect, useState } from "react";
import { User } from "../models/User";
import LogoutIcon from '@mui/icons-material/Logout';
import jwt_decode from 'jwt-decode';


export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	const [user, setUser] = useState<User>({
		id:1,
        username: '',
        user_first_name: '',
        user_last_name: '',
        user_date_of_birth: '',
        user_bio: '',
        user_location: ''
    });

	useEffect(() => {
		const intervalId = setInterval(() => {
			const token = localStorage.getItem('token');
			if (token !== null) {
			const decoded: any = jwt_decode(token);
			const user = decoded['user'];
			setUser(user);
			}
			else {
				setUser({id:1, username: '',
				user_first_name: '',
				user_last_name: '',
				user_date_of_birth: '',
				user_bio: '',
				user_location: ''});
			}
		}, 250);
	
		// Clean up the interval when the component unmounts
		return () => clearInterval(intervalId);
	  }, []);

	return (
		<Box>
			<AppBar style={{backgroundColor:"#34495E"}}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<PoolIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Professional swimming
					</Typography>

					{user.username === '' && (
					<Button
						variant={path.startsWith("/register") ? "outlined" : "text"}
						to="/register"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<HowToRegIcon />}>
						Register
					</Button>
					)}

					{user.username === '' && (
					<Button
						variant={path.startsWith("/login") ? "outlined" : "text"}
						to="/login"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LoginIcon />}>
						LogIn
					</Button>
					)}

					{user.username !== '' && (
					<Button
						variant={path.startsWith("/logout") ? "outlined" : "text"}
						to="/logout"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LogoutIcon />}>
						LogOut
					</Button>
					)}



					<Button
						variant={path.startsWith("/swimmers") ? "outlined" : "text"}
						to="/swimmers"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<ScubaDivingIcon />}>
						Swimmers
					</Button>

					<Button
						variant={path.startsWith("/teams") ? "outlined" : "text"}
						to="/teams"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<GroupsIcon />}>
						Teams
					</Button>

					<Button
						variant={path.startsWith("/coaches") ? "outlined" : "text"}
						to="/coaches"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<SportsIcon />}>
						Coaches
					</Button>

					<Button
						variant={path.startsWith("/fans") ? "outlined" : "text"}
						to="/fans"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<Face2Icon />}>
						Fans
					</Button>

					<Button
						variant={path.startsWith("/swimmerfans") ? "outlined" : "text"}
						to="/swimmerfans"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<ConnectWithoutContactIcon />}>
						Swimmer Fans
					</Button>

					<Button
						variant={path.startsWith("/allstatistics" ) ? "outlined" : "text"}
						to="/allstatistics" 
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<InsightsIcon />}>
						Statistics
					</Button>

				</Toolbar>
			</AppBar>
		</Box>
	);
};


