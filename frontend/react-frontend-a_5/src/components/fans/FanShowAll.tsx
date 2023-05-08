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
import { Link } from "react-router-dom";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { BACKEND_API_URL } from "../../constants";
import { Fan } from "../../models/Fan";
import { Paginator } from "../pagination/Pagination";

export const FanShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [fans, setFans] = useState([]);
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

    const fetchFans = async () => {
        setLoading(true);
        const stringUser = localStorage.getItem("user");
        const user = JSON.parse(stringUser!);
        const new_page_size = user?.page_size || 10;
        setPageSize(new_page_size);
        const response = await fetch(
          `${BACKEND_API_URL}/fan/?page=${page}&page_size=${new_page_size}`
        );
        const { count, next, previous, results } = await response.json();
        setFans(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
        console.log(results);
      };
    
      useEffect(() => {
        fetchFans();
      }, [page]);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Fans</h1>

        {loading && <CircularProgress />}

        {!loading && fans.length == 0 && <div>No fans found</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/fans/add`}>
                <Tooltip title="Add a new fan" arrow>
                    <PersonAddAlt1Icon style={{color:"whitesmoke", fontSize:"50px"}} />
                </Tooltip>
            </IconButton>

        )}


        {!loading && fans.length > 0 && (
          <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>First Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Last Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Nationality</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Date Of Birth</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Email</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Number of Swimmers</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Added by</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                         
                        {fans.map((fan:Fan, index:number) => (

                            <TableRow key={fan.id}>
                                <TableCell component="th" scope="row">
                                    {(crt + index)}
                                <TableCell component="th" scope="row">
                                    <Link to={`/fans/${fan.id}`} title="View fan details">
                                        {"view details"}
                                        
                                    </Link>

                                </TableCell>
                                </TableCell>
                                <TableCell align="center">{fan.fan_first_name}</TableCell>
                                <TableCell align="center">{fan.fan_last_name}</TableCell>
                                <TableCell align="center">{fan.fan_nationality}</TableCell>
                                <TableCell align="center">{fan.fan_date_of_birth}</TableCell>
                                <TableCell align="center">{fan.fan_email}</TableCell>
                                <TableCell align="center">{fan.swimmers.length}</TableCell>
                                <TableCell align="center">

										<IconButton component={Link} sx={{ mr: 3 }} to={`/fans/${fan.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/fans/${fan.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                                    <TableCell component="th" scope="row">
                                <Link to={`/profile/${fan.added_by.id}`}>
                                        {fan.added_by.username}      
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