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
import { Coach } from "../../models/Coach";
import { Paginator } from "../pagination/Pagination";

export const CoachShowAll = () => {
    const[loading, setLoading] = useState(true);
    const[coaches, setCoaches] = useState([]);
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

    const fetchCoaches = async () => {
        setLoading(true);
        const stringUser = localStorage.getItem("user");
        const user = JSON.parse(stringUser!);
        const new_page_size = user?.page_size || 10;
        setPageSize(new_page_size);
        const response = await fetch(
          `${BACKEND_API_URL}/coach/?page=${page}&page_size=${new_page_size}`
        );
        const { count, next, previous, results } = await response.json();
        setCoaches(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchCoaches();
      }, [page]);
    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Coaches</h1>

        {loading && <CircularProgress />}

        {!loading && coaches.length == 0 && <div>No coaches found</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/add`}>
                <Tooltip title="Add a new coach" arrow>
                    <PersonAddAlt1Icon style={{color:"whitesmoke", fontSize:"50px"}} />
                </Tooltip>
            </IconButton>

        )}


        {!loading && coaches.length > 0 && (
          <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>First Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Last Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Years of experience</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Date Of Birth</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Email</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Added by</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coaches.map((coach:Coach, index) => (
                            <TableRow key={coach.id}>
                                <TableCell component="th" scope="row">
                                    {index + crt}
                                <TableCell component="th" scope="row">
                                    <Link to={`/coaches/${coach.id}`} title="View coach details">
                                        {"view details"}
                                        
                                    </Link>

                                </TableCell>
                                </TableCell>
                                <TableCell align="center">{coach.coach_first_name}</TableCell>
                                <TableCell align="center">{coach.coach_last_name}</TableCell>
                                <TableCell align="center">{coach.coach_years_of_experience}</TableCell>
                                <TableCell align="center">{coach.coach_date_of_birth}</TableCell>
                                <TableCell align="center">{coach.coach_email}</TableCell>
                                <TableCell align="center">

										<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coach.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coach.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/profile/${coach.added_by.id}`}>
                                                {coach.added_by.username}      
                                            </Link>
                                    </TableCell>  
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