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
    TextField,
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
import { Paginator } from "../pagination/Pagination";

export const SwimmerFilterYoe = () => {
    const[loading, setLoading] = useState(true);
    const[swimmers, setSwimmers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [yoeFilter, setYoeFilter] = useState("");
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

    const fetchSwimmers = async () => {
        setLoading(true);
        let url = `${BACKEND_API_URL}/yoe/${yoeFilter}/?page=${page}&page_size=${pageSize}`;
        const response = await fetch(url);
        const { count, next, previous, results } = await response.json();
        setSwimmers(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
      };
      
    
      useEffect(() => {
        fetchSwimmers();
      }, [page]);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Swimmers Filtered</h1>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <TextField 
          label="Years of Experience"
          value={yoeFilter}
          onChange={(e) => setYoeFilter(e.target.value)}
          InputProps={{ style: { color: "whitesmoke" } }}
          InputLabelProps={{style: {color: 'whitesmoke'}}}
          style={{ marginRight: "16px", color:'whitesmoke' }}
        />
        <Button variant="contained" style={{color:"whitesmoke"}} onClick={() => fetchSwimmers()}>
          Filter
        </Button>
      </div>

        {loading && <CircularProgress />}

        {!loading && swimmers.length == 0 && <div>No swimmers found</div>}


        {!loading && swimmers.length > 0 && (
          <>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {swimmers.map((swimmer:Swimmer, index) => (
                            <TableRow key={swimmer.id}>
                                <TableCell component="th" scope="row">
                                    {index + crt}
                                </TableCell>
                                <TableCell align="center">{swimmer.swimmer_last_name}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_first_name}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_county}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_date_of_birth}</TableCell>
                                <TableCell align="center">{swimmer.swimmer_years_of_experience}</TableCell>
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