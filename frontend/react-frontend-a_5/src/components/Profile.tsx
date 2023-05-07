import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { User } from '../models/User';
import { Card, CardContent, Container, TextField } from '@mui/material';
import { FullUser } from '../models/FullUser';
import { useParams } from 'react-router-dom';
import { BACKEND_API_URL } from '../constants';

export const UserProfile = () => {

    const { profileId } = useParams();

    const [user, setUser] = useState<FullUser>({
        username: '',
        user_first_name: '',
        user_last_name: '',
        user_date_of_birth: '',
        user_bio: '',
        user_location: '',
        swimmers_count:1,
        teams_count:1,
        coaches_count:1,
        fans_count:1
    });

    useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch(`${BACKEND_API_URL}/profile/${profileId}/`);
			const user = await response.json();
			setUser(user);
            console.log(user);
		};
		fetchUser();
	}, [profileId]);


    return (
	
		<>
		 {user.username === '' && (
                <h1>Home page</h1>
            )}

		{user.username !== '' && (
			<>
		<h1>{user.username}' s details!</h1>
		<Container>
		<Card style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
			<CardContent style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
				<TextField
					id="username"
					label="Username"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.username}
					InputProps={{
						readOnly: true,
					}}
				/>

				<TextField
					id="FirstName"
					label="First Name"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.user_first_name}
					InputProps={{
						readOnly: true,
					}}
				/>

				<TextField
					id="lastName"
					label="Last Name"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.user_last_name}
					InputProps={{
						readOnly: true,
					}}
				/>

				<TextField
					id="date_of_birth"
					label="Date of Birth"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.user_date_of_birth}
					InputProps={{
						readOnly: true,
					}}
				/>

				<TextField
					id="bio"
					label="Bio"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.user_bio}
					InputProps={{
						readOnly: true,
					}}
				/>

				<TextField
					id="location"
					label="Location"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.user_location}
					InputProps={{
						readOnly: true,
					}}
				/>

                <TextField
					id="swimmers"
					label="Swimmers Count"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.swimmers_count}
					InputProps={{
						readOnly: true,
					}}
                    InputLabelProps={{ shrink: true }} 
				/>

                <TextField
					id="teams"
					label="Teams Count"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.teams_count}
					InputProps={{
						readOnly: true,
					}}
                    InputLabelProps={{ shrink: true }} 
				/>  

                <TextField
					id="coaches"
					label="Coaches Count"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.coaches_count}
					InputProps={{
						readOnly: true,
					}}
                    InputLabelProps={{ shrink: true }} 
				/>  

                <TextField
					id="teams"
					label="Fans Count"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.fans_count}
					InputProps={{
						readOnly: true,
					}}
                    InputLabelProps={{ shrink: true }} 
				/>  

			</CardContent>
		</Card>
	</Container>
	</>
	)}
	</>
    );
	

};