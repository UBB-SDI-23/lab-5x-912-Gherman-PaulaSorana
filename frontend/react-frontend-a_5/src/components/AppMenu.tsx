import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PoolIcon from '@mui/icons-material/Pool';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import Diversity3Icon from '@mui/icons-material/Diversity3';

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" style={{ width: "100%", top: 0, minHeight:200 }}>
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
						to="/teams/teamsOrd"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<Diversity3Icon />}>
						Teams Ordered By The No Of Swimmers
					</Button>

				</Toolbar>
			</AppBar>
		</Box>
	);
};