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

export const FanShowAll = () => {
    const[loading, setLoading] = useState(true);
    const[fans, setFans] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    

    // useEffect(() => {
    // fetch(`${BACKEND_API_URL}/swimmer/`)
    //     .then(res => res.json())
    //     .then(data => {setSwimmers(data); setLoading(false);})
    // }, []);

    // console.log(swimmers);

    const fetchFans = async () => {
        setLoading(true);
        const response = await fetch(
          `${BACKEND_API_URL}/fan?page=${page}&page_size=${pageSize}`
        );
        const { count, next, previous, results } = await response.json();
        setFans(results);
        setLoading(false);
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
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fans.map((fan:Fan, index) => (
                            <TableRow key={fan.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
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
                                <TableCell align="center">

										<IconButton component={Link} sx={{ mr: 3 }} to={`/fans/${fan.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/fans/${fan.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
            </Button>

            <Button
            disabled={fans.length < pageSize}
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