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
import { SwimmerFan } from "../../models/SwimmerFan";

export const SwimmerFanShowAll = () => {
    const[loading, setLoading] = useState(true)
    const[swimmers, setSwimmers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const crt = (page - 1) * pageSize + 1;

    const fetchSwimmers = async () => {
        setLoading(true);
        const response = await fetch(
          `${BACKEND_API_URL}/swimmerfan/?page=${page}&page_size=${pageSize}`
        );
        const { count, next, previous, results } = await response.json();
        setSwimmers(results);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchSwimmers();
      }, [page]);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Swimmers' Fans</h1>

        {loading && <CircularProgress />}

        {!loading && swimmers.length == 0 && <div>No swimmerfans found</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/swimmerfans/add`}>
                <Tooltip title="Add a new swimmer fan" arrow>
                    <PersonAddAlt1Icon style={{color:"whitesmoke", fontSize:"50px"}} />
                </Tooltip>
            </IconButton>

        )}


        {!loading && swimmers.length > 0 && (
          <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Fan page</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Fan since year</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {swimmers.map((swimmer:SwimmerFan, index) => (
                            <TableRow key={swimmer.id}>
                                <TableCell component="th" scope="row">
                                    {index + crt}
                                <TableCell component="th" scope="row">
                                    <Link to={`/swimmersfans/${swimmer.id}`} title="View swimmer fan details">
                                        {"view details"}
                                        
                                    </Link>

                                </TableCell>
                                </TableCell>
                                <TableCell align="center">{swimmer.fan_page_name}</TableCell>
                                <TableCell align="center">{swimmer.fan_since_year}</TableCell>
                                <TableCell align="center">

										<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmerfans/${swimmer.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmerfans/${swimmer.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button style={{color:"whitesmoke"}} disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
            </Button>

            <Button style={{color:"whitesmoke"}}
            disabled={swimmers.length < pageSize}
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