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

export const SwimmerShowAll = () => {
    const[loading, setLoading] = useState(true)
    const[swimmers, setSwimmers] = useState([]);

    useEffect(() => {
    // fetch(GlobalURL + "/app1/swimmer/")
    fetch("/api/swimmer/")
        .then(res => res.json())
        .then(data => {setSwimmers(data); setLoading(false);})
    }, []);

    console.log(swimmers);

    const sortSwimmers = () => {
        const sortedSwimmers = [...swimmers].sort((a: Swimmer, b: Swimmer) => {
            if (a.swimmer_years_of_experience < b.swimmer_years_of_experience) {
                return -1;
            }
            if (a.swimmer_years_of_experience > b.swimmer_years_of_experience) {
                return 1;
            }
            return 0;
        })
        console.log(sortedSwimmers);
        setSwimmers(sortedSwimmers);
    }
    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Swimmers</h1>

        {loading && <CircularProgress />}

        {!loading && swimmers.length == 0 && <div>No swimmers found</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/add`}>
                <Tooltip title="Add a new swimmer" arrow>
                    <PersonAddAlt1Icon style={{color:"whitesmoke", fontSize:"50px"}} />
                </Tooltip>
            </IconButton>

        )}

        {!loading && (
                <Button sx={{color:"black"}} onClick={sortSwimmers} >
                    Sort swimmers
                </Button>
            )}

        {!loading && swimmers.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Last Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>First Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>County</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Date Of Birth</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Years of experience</TableCell>
                            {/* <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Team ID</TableCell> */}
                            {/* <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Fans IDS</TableCell> */}
                            <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations</TableCell>
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
                                {/* <TableCell align="center">{swimmer.team}</TableCell> */}
                                {/* <TableCell align="center">{swimmer.fans}</TableCell> */}
                                <TableCell align="center">

										<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/${swimmer.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/swimmers/${swimmer.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
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