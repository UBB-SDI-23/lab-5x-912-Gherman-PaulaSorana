import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { User } from '../models/User';
import { Button, Card, CardContent, Container, Link, TextField } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { toast, ToastContainer } from 'react-toastify';
import { BACKEND_API_URL } from '../constants';
import axios from 'axios';

export const AppHome = () => {

    const [user, setUser] = useState<User>({
		id:1,
        username: '',
        user_first_name: '',
        user_last_name: '',
        user_date_of_birth: '',
        user_bio: '',
        user_location: '',
		page_size: 1,
		role: ''
    });

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = userString !== null ? JSON.parse(userString) : null;

        if (user !== null) {
            setUser(user);
        }
    }, []);


    return (
	
		<>
		 {user.username === '' && (
                <h1>Home page</h1>
            )}

		{user.username !== '' && (
			<>
		<h1>Welcome back, {user.username}!</h1>
		<>
		<TextField
			id="page_sizes"
			label="Page Size"
			variant="outlined"
			fullWidth
			sx={{ mb: 2, color: "whitesmoke !important" }}
			value={user.page_size}
			type="number"
			onChange={(event) => {
				// changed
				const size = Number(event.target.value);
				if (size < 1 || size > 100) {
					toast.error('Page size must be between 1 and 100');
					return;
				}

				try {
					axios.put(`${BACKEND_API_URL}/update-page-size/${user.id}/`, {
						"page_size": user.page_size,
					}, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						}
					});

					user.page_size = size;
					localStorage.setItem('user', JSON.stringify(user));
					setUser({ ...user });
				} catch (error) {
					toast.error("Error updating page size");
				}
			}}
			/>
		</>
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

			</CardContent>
		</Card>
		<ToastContainer />
	</Container>
	</>
	)}
	</>
    );
	

};