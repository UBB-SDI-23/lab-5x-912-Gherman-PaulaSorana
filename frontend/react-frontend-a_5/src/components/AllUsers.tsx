import {
    TableContainer,
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
    Select,
    MenuItem,
    Paper,
} from "@mui/material";import axios from "axios";
 import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";
import { UserRoles } from "../models/UserRoles";
import { Paginator } from "./pagination/Pagination";


const Users = () => {

    const [loading, setLoading] = useState(true)
    const [users, setUers] = useState([])
    const [page, setPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)
    const [totalRows, setTotalRows] = useState(0)

    const rowsPerPage = 10;

    useEffect(() => {
        setLoading(true);

        const stringUser = localStorage.getItem("user");
        const user = JSON.parse(stringUser!);
        const new_page_size = user?.page_size || 10;

        fetch(`${BACKEND_API_URL}/users/?page=${page}&page_size=${new_page_size}`)
            .then(res => res.json())
            .then(data => {
                const { count, next, prev, results } = data;
                setIsLastPage(!next);
                setTotalRows(count);
                setUers(results);
                setLoading(false);
            });
    }, [page])

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


    return (
        <Container>
            <h1>All users</h1>

            {loading && <CircularProgress />}

            {!loading && users.length == 0 && <div>No users found</div>}

            {!loading && users.length > 0 && (
                <>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "#2471A3", fontWeight: "bold" }} align="center">#</TableCell>
                                    <TableCell sx={{ color: "#2471A3", fontWeight: "bold" }} align="center">Username</TableCell>
                                    <TableCell sx={{ color: "#2471A3", fontWeight: "bold" }} align="center">Role</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users.map((user: UserRoles, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell sx={{ color: "#2471A3" }} align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ color: "#2471A3" }} align="center">
                                            <Link to={`/users/${user.id}`}>
                                                {user.username}
                                            </Link>
                                        </TableCell>
                                        <Select
                                            labelId="role-selct"
                                            id="role-select"
                                            value={user.role}
                                            label=""
                                            sx={{ width: "100%", color: "#2471A3"}}
                                            onChange={(e) => { 
                                                user.role = e.target.value; 
                                                setUers([...users]);
                                                axios.put(`${BACKEND_API_URL}/update-role/${user.id}/`, {
                                                    "role": user.role,
                                                }, {
                                                    headers: {
                                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                    }
                                                });
                                                
                                            }}
                                        >
                                            <MenuItem value={"regular"}>Regular</MenuItem>
                                            <MenuItem value={"moderator"}>Moderator</MenuItem>
                                            <MenuItem value={"admin"}>Admin</MenuItem>
                                        </Select>
                                    </TableRow>))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Paginator
                        rowsPerPage={rowsPerPage}
                        totalRows={totalRows}
                        currentPage={page}
                        isFirstPage={page === 1}
                        isLastPage={isLastPage}
                        setPage={setCurrentPage}
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                    />
                </>
            )}


        </Container>
    )
}

export default Users;