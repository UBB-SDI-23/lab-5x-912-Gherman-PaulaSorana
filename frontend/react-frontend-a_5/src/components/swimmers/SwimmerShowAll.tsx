import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";


import { useEffect, useState } from "react";
import { GlobalURL } from "../../main";
import { Swimmer } from "../../models/Swimmer";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const SwimmerShowAll = () => {
    const[loading, setLoading] = useState(true)
    const [swimmers, setSwimmers] = useState([]);

    useEffect(() => {
    // fetch(GlobalURL + "/app1/swimmer/")
    fetch("/api/swimmer/")
        .then(res => res.json())
        .then(data => setSwimmers(data));
    }, []);

    console.log(swimmers);

    
    return (
    <Container>
        <h1>All Swimmers</h1>

        {loading && <CircularProgress />}

        {!loading && swimmers.length == 0 && <div>No students found</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/add`}>
                <Tooltip title="Add a new swimmer" arrow>
                    <AddIcon color="primary" />
                </Tooltip>
            </IconButton>
        )}

        {!loading && swimmers.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">County</TableCell>
                            <TableCell align="center">Date Of Birth</TableCell>
                            <TableCell align="center">Years of experience</TableCell>
                            <TableCell align="center">Team ID</TableCell>
                            <TableCell align="center">Fans IDS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {swimmers.map((swimmer:Swimmer, index) => (
                            <TableRow key={swimmer.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                <TableCell component="th" scope="row">
                                    <Link to={`/swimmers/${swimmer.id}`} title="View swimmer details">
                                        {"view details"}
                                    </Link>
                                </TableCell>
                                </TableCell>
                                <TableCell align="center">{swimmer.swimmer_last_name}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_first_name}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_county}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_date_of_birth}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_years_of_experience}</TableCell>
                                <TableCell align="center">{swimmer.team}</TableCell>
                                <TableCell align="center">{swimmer.fans}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )
        }
    </Container>
        
    );       
};