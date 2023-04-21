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
import { FanOrderedAgvSwimmer } from "../../models/FanOrderedAgvSwim";

export const FanOrdShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [fans, setFans] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const crt = (page - 1) * pageSize + 1;

    const fetchFans = async () => {
        setLoading(true);
        const response = await fetch(
          `${BACKEND_API_URL}/fanAvgYoe/?page=${page}&page_size=${pageSize}`
        );
        const { count, next, previous, results } = await response.json();
        setFans(results);
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
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Avg Yoe Swimmers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                         
                        {fans.map((fan:FanOrderedAgvSwimmer, index:number) => (

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
                                <TableCell align="center">{fan.avg_swimmer_experience}</TableCell>
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
            <Button style={{color:"whitesmoke"}} disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
            </Button>

            <Button style={{color:"whitesmoke"}}
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