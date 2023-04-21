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
    Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { GlobalURL } from "../../main";
import { Swimmer } from "../../models/Swimmer";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Scale } from "@mui/icons-material";
import { BACKEND_API_URL } from "../../constants";
import { TeamOrdNoSwim } from "../../models/TeamOrdNoSwim";

export const TeamsShowOrdSwim = () => {
    const[loading, setLoading] = useState(true);
    const[ordTeams, setOrdTeams] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const crt = (page - 1) * pageSize + 1;

    const fetchOrdTeams = async () => {
        setLoading(true);
        const response = await fetch(
          `${BACKEND_API_URL}/teamNoSwim/?page=${page}&page_size=${pageSize}`
        );
        const { count, next, previous, results } = await response.json();
        setOrdTeams(results);
        setLoading(false);
        console.log(results);
      };
    
      useEffect(() => {
        fetchOrdTeams();
      }, [page]);
    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>Teams Ordered By The Number Of Swimmers</h1>

        {loading && <CircularProgress />}

        {!loading && ordTeams.length == 0 && <div>No teams found</div>}

        {!loading && ordTeams.length > 0 && (
          <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Founding year</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Budget</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Motto</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Abbreviation</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Swimmers</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>No Swimmers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordTeams.map((ordTeam:TeamOrdNoSwim, index) => (
                            <TableRow key={ordTeam.id}>
                                <TableCell component="th" scope="row">
                                    {index + crt}
                                </TableCell>
                                <TableCell align="center">{ordTeam.team_name}</TableCell>
                                <TableCell align="center">{ordTeam.team_founding_year}</TableCell>
                                <TableCell align="center">{ordTeam.team_budget}</TableCell>
                                <TableCell align="center">{ordTeam.team_motto}</TableCell>
                                <TableCell align="center">{ordTeam.team_abbreviation}</TableCell>
                                <TableCell align="left">
                                    {ordTeam?.swimmers?.map((swimmer) => (
                                    <li key={swimmer.id}>{swimmer.swimmer_last_name} {swimmer.swimmer_first_name}</li>
                                    ))}
                                </TableCell>
                                <TableCell align="center">{ordTeam.no_of_swimmers}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button style={{color:"whitesmoke"}} disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
            </Button>

            <Button style={{color:"whitesmoke"}}
            disabled={ordTeams.length < pageSize}
            onClick={() => setPage(page + 1)}
            >
            Next
            </Button>
          </>
        )
        }
    </Container>
        
    );       
};