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

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { GlobalURL } from "../../main";
import { Swimmer } from "../../models/Swimmer";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { TeamOrdNoSwim } from "../../models/TeamOrdNoSwim";

export const TeamsShowOrdSwim = () => {
    const[loading, setLoading] = useState(true)
    const [teams, setTeams] = useState([]);

    useEffect(() => {
    // fetch(GlobalURL + "/app1/swimmer/")
    fetch("/api/teamNoSwim/")
        .then(res => res.json())
        .then(data => {setTeams(data); setLoading(false);})
    }, []);

    console.log(teams);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Teams Ordered By The Number Of Swimmers</h1>

        {loading && <CircularProgress />}

        {!loading && teams.length == 0 && <div>No teams found</div>}

        {!loading && teams.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Team Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Founding Year</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Budget</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Motto</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Abbreviation</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Swimmers Names</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Number Of Swimmers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((teams:TeamOrdNoSwim, index) => (
                            <TableRow key={teams.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{teams.team_name}</TableCell>
                                <TableCell align="center">{teams.team_founding_year}</TableCell>
                                <TableCell align="center">{teams.team_budget}</TableCell>
                                <TableCell align="center">{teams.team_motto}</TableCell>
                                <TableCell align="center">{teams.team_abbreviation}</TableCell>
                                <TableCell align="left">
                                    {teams?.swimmers?.map((swimmer) => (
                                    <li key={swimmer.id}>{swimmer.swimmer_last_name} {swimmer.swimmer_first_name}</li>
                                    ))}
                                </TableCell>
                                <TableCell align="center">{teams.no_of_swimmers}</TableCell>
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