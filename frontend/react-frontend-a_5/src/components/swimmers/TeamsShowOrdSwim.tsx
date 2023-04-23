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
import { Link } from "react-router-dom";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Scale } from "@mui/icons-material";
import { BACKEND_API_URL } from "../../constants";
import { TeamOrdNoSwim } from "../../models/TeamOrdNoSwim";
import { Paginator } from "../pagination/Pagination";

export const TeamsShowOrdSwim = () => {
    const[loading, setLoading] = useState(true);
    const[teams, setTeams] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const crt = (page - 1) * pageSize + 1;

    const [isLastPage, setIsLastPage] = useState(false);

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const goToNextPage = () => {
        if (isLastPage) {
            return;
        }

        setPage(page + 1);
    }

    const goToPrevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }

    
    const fetchTeams = async () => {
        setLoading(true);
        const response = await fetch(
          `${BACKEND_API_URL}/teamNoSwim/?page=${page}&page_size=${pageSize}`
        );
        const { count, next, previous, results } = await response.json();
        setTeams(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchTeams();
      }, [page]);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Teams Ordered By The Number Of Swimmers</h1>

        {loading && <CircularProgress />}

        {!loading && teams.length == 0 && <div>No teams found</div>}

        {!loading && teams.length > 0 && (
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
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>No Of Swimmers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team:TeamOrdNoSwim, index) => (
                            <TableRow key={team.id}>
                                <TableCell component="th" scope="row">
                                    {index + crt}
                                </TableCell>
                                <TableCell align="center">{team.team_name}</TableCell>
                                <TableCell align="center">{team.team_founding_year}</TableCell>
                                <TableCell align="center">{team.team_budget}</TableCell>
                                <TableCell align="center">{team.team_motto}</TableCell>
                                <TableCell align="center">{team.team_abbreviation}</TableCell>
                                <TableCell align="center">{team.no_of_swimmers}</TableCell>
                                
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Paginator
                        rowsPerPage={pageSize}
                        totalRows={totalRows}
                        currentPage={page}
                        isFirstPage={page === 1}
                        isLastPage={isLastPage}
                        setPage={setCurrentPage}
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                    />
            
          </>
        )
        }
    </Container>
        
    );       
};